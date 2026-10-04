import { useState } from 'react'
import Alert from '~/components/Alert'
import StyledModal from '~/components/StyledModal'
import Input from '~/components/inputs/Input'
import { useNotifications } from '~/context/NotificationContext'
import { useModals } from '~/context/ModalContext'
import api from '~/lib/api'
import type { GpuHealthStatus } from '../../types/system'

const DISMISS_KEY = 'nomad:gpu-banner-dismissed'
const HSA_OVERRIDE_PATTERN = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/

/**
 * Banner for gpuHealth.status === 'passthrough_failed'.
 *
 * NVIDIA, and AMD whose container differs from what a reinstall would create, get
 * the one-click reinstall. AMD whose container already matches gets an HSA override
 * prompt instead: reinstalling it rebuilds the same CPU-bound container (#1344).
 */
export default function GpuPassthroughAlert({
  gpuHealth,
  assistantName,
  className,
}: {
  gpuHealth: GpuHealthStatus | undefined
  assistantName: string
  className?: string
}) {
  const { addNotification } = useNotifications()
  const { openModal, closeAllModals } = useModals()
  const [reinstalling, setReinstalling] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === 'true'
    } catch {
      return false
    }
  })

  if (gpuHealth?.status !== 'passthrough_failed' || dismissed) return null

  const isAmd = gpuHealth.gpuVendor === 'amd'
  const needsHsaOverride = isAmd && gpuHealth.amdReinstallWouldChange === false

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, 'true')
    } catch {}
  }

  const reinstall = async () => {
    setReinstalling(true)
    try {
      const response = await api.forceReinstallService('nomad_ollama')
      if (!response || !response.success) {
        throw new Error(response?.message || 'Échec de la réinstallation forcée')
      }
      addNotification({
        message: `${assistantName} est en cours de réinstallation avec la prise en charge de la carte graphique. La page va se recharger.`,
        type: 'success',
      })
      try {
        localStorage.removeItem(DISMISS_KEY)
      } catch {}
      setTimeout(() => window.location.reload(), 5000)
    } catch (error) {
      addNotification({
        message: `Échec de la réinstallation : ${error instanceof Error ? error.message : 'erreur inconnue'}`,
        type: 'error',
      })
      setReinstalling(false)
    }
  }

  const openReinstallModal = () => {
    openModal(
      <StyledModal
        title={`Réinstaller ${assistantName} ?`}
        onConfirm={() => {
          closeAllModals()
          reinstall()
        }}
        onCancel={closeAllModals}
        open={true}
        confirmText="Réinstaller"
        cancelText="Annuler"
      >
        <p className="text-text-primary">
          Le conteneur {assistantName} va être recréé avec la prise en charge de la carte graphique.
          Vos modèles téléchargés seront conservés. Le service sera brièvement indisponible pendant
          la réinstallation.
        </p>
      </StyledModal>,
      'gpu-health-force-reinstall-modal'
    )
  }

  const openHsaOverrideModal = () => {
    openModal(
      <HsaOverrideModal
        gpuHealth={gpuHealth}
        assistantName={assistantName}
        onCancel={closeAllModals}
        onSaved={() => {
          closeAllModals()
          reinstall()
        }}
      />,
      'gpu-health-hsa-override-modal'
    )
  }

  const vendorName = isAmd ? 'AMD' : 'NVIDIA'
  const message = needsHsaOverride
    ? `Votre système a une carte graphique AMD, mais ${assistantName} tourne uniquement sur le processeur. Une réinstallation ne suffira pas : la carte${gpuHealth.amdGfxTarget ? ` (${gpuHealth.amdGfxTarget})` : ''} ne figure pas dans la liste prise en charge par ROCm et nécessite un forçage de la version GFX.`
    : `Votre système a une carte graphique ${vendorName}, mais ${assistantName} n'y a pas accès. L'IA tourne uniquement sur le processeur, ce qui est nettement plus lent.`

  return (
    <Alert
      type="warning"
      variant="bordered"
      title={`Carte graphique inaccessible pour ${assistantName}`}
      message={message}
      className={className}
      dismissible={true}
      onDismiss={handleDismiss}
      buttonProps={{
        children: needsHsaOverride ? 'Corriger : forcer la version GFX' : `Corriger : réinstaller ${assistantName}`,
        icon: needsHsaOverride ? 'IconTool' : 'IconRefresh',
        variant: 'action',
        size: 'sm',
        onClick: needsHsaOverride ? openHsaOverrideModal : openReinstallModal,
        loading: reinstalling,
        disabled: reinstalling,
      }}
    />
  )
}

function HsaOverrideModal({
  gpuHealth,
  assistantName,
  onCancel,
  onSaved,
}: {
  gpuHealth: GpuHealthStatus
  assistantName: string
  onCancel: () => void
  onSaved: () => void
}) {
  const { addNotification } = useNotifications()
  const [value, setValue] = useState(gpuHealth.suggestedHsaOverride ?? '')
  const [saving, setSaving] = useState(false)
  const valid = HSA_OVERRIDE_PATTERN.test(value.trim())

  const save = async () => {
    setSaving(true)
    try {
      const response = await api.updateSetting('ai.amdHsaOverride', value.trim())
      // catchInternal already notified on a request failure and returned undefined.
      if (!response) {
        setSaving(false)
        return
      }
      if (!response.success) throw new Error(response.message)
      onSaved()
    } catch (error) {
      addNotification({
        message: `Impossible d'enregistrer le forçage GFX : ${error instanceof Error ? error.message : 'erreur inconnue'}`,
        type: 'error',
      })
      setSaving(false)
    }
  }

  return (
    <StyledModal
      title="Forcer la version GFX AMD"
      onConfirm={save}
      onCancel={onCancel}
      open={true}
      confirmText="Enregistrer et réinstaller"
      cancelText="Annuler"
      confirmLoading={saving}
      confirmDisabled={!valid || saving}
    >
      <div className="space-y-4 text-text-primary">
        <p>
          ROCm fournit des noyaux de calcul pour une liste fixe de puces AMD. Les circuits Radeon
          intégrés hors de cette liste tournent sur le processeur, sauf si ROCm les traite comme une
          puce prise en charge, ce qui se règle avec HSA_OVERRIDE_GFX_VERSION.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Radeon 780M / 760M (gfx1103) : 11.0.0</li>
          <li>Radeon 680M / 660M et autres circuits intégrés RDNA 2 (gfx1031 à gfx1036) : 10.3.0</li>
        </ul>
        <p className="text-sm text-text-secondary">
          Carte détectée : {gpuHealth.amdGfxTarget ?? 'non indiquée par Ollama'}. Forçage actuel :{' '}
          {gpuHealth.currentHsaOverride ?? 'aucun'}.
          {gpuHealth.suggestedHsaOverride
            ? ` Recommandé pour cette carte : ${gpuHealth.suggestedHsaOverride}.`
            : ''}
        </p>
        <Input
          name="amdHsaOverride"
          label="Forçage de la version GFX"
          placeholder="11.0.0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={value.trim() !== '' && !valid}
          helpText={`L'enregistrement recrée le conteneur ${assistantName} avec ce forçage. Les modèles téléchargés sont conservés.`}
        />
      </div>
    </StyledModal>
  )
}
