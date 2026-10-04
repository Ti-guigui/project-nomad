import { useEffect, useState } from 'react'
import StyledButton from '~/components/StyledButton'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import Alert from '~/components/Alert'
import api from '~/lib/api'
import Input from '~/components/inputs/Input'
import Switch from '~/components/inputs/Switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { useContentAutoUpdateStatus } from '~/hooks/useContentAutoUpdateStatus'
import { formatBytes } from '~/lib/util'

const COOLOFF_OPTIONS = [
  { value: 24, label: '24 heures (1 jour)' },
  { value: 48, label: '48 heures (2 jours)' },
  { value: 72, label: '72 heures (3 jours)' },
  { value: 168, label: '7 jours' },
]

const BYTES_PER_GB = 1024 * 1024 * 1024

export default function ContentAutoUpdateSection() {
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const { data: status, isLoading } = useContentAutoUpdateStatus()

  const [windowStart, setWindowStart] = useState('02:00')
  const [windowEnd, setWindowEnd] = useState('05:00')
  const [cooloff, setCooloff] = useState(72)
  // Data cap is stored in bytes but edited in GB (0 = unlimited).
  const [capGb, setCapGb] = useState('0')

  // Seed editable fields once the persisted status loads.
  useEffect(() => {
    if (status) {
      setWindowStart(status.windowStart)
      setWindowEnd(status.windowEnd)
      setCooloff(status.cooloffHours)
      setCapGb(
        status.maxBytesPerWindow > 0
          ? String(Math.round((status.maxBytesPerWindow / BYTES_PER_GB) * 100) / 100)
          : '0'
      )
    }
  }, [status?.windowStart, status?.windowEnd, status?.cooloffHours, status?.maxBytesPerWindow])

  const enabled = status?.enabled ?? false
  const autoDisabled = !!status?.autoDisabledReason

  const toggleMutation = useMutation({
    mutationFn: (value: boolean) => api.updateSetting('contentAutoUpdate.enabled', value),
    onSuccess: (_data, value) => {
      queryClient.invalidateQueries({ queryKey: ['content-auto-update-status'] })
      addNotification({
        type: 'success',
        message: value
          ? 'Mises à jour automatiques des contenus activées.'
          : 'Mises à jour automatiques des contenus désactivées.',
      })
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Impossible de modifier le réglage de mise à jour automatique des contenus.' })
    },
  })

  const handleSaveSchedule = async () => {
    const parsedGb = Number(capGb)
    if (!Number.isFinite(parsedGb) || parsedGb < 0) {
      addNotification({ type: 'error', message: 'Le plafond de données doit être 0 ou un nombre positif de Go.' })
      return
    }
    const capBytes = Math.round(parsedGb * BYTES_PER_GB)
    try {
      await api.updateSetting('contentAutoUpdate.windowStart', windowStart)
      await api.updateSetting('contentAutoUpdate.windowEnd', windowEnd)
      await api.updateSetting('contentAutoUpdate.cooloffHours', String(cooloff))
      await api.updateSetting('contentAutoUpdate.maxBytesPerWindow', String(capBytes))
      queryClient.invalidateQueries({ queryKey: ['content-auto-update-status'] })
      addNotification({ type: 'success', message: 'Planification des mises à jour des contenus enregistrée.' })
    } catch {
      addNotification({ type: 'error', message: "Impossible d'enregistrer la planification des mises à jour des contenus." })
    }
  }

  return (
    <>
      <StyledSectionHeader title="Mises à jour automatiques des contenus" className="mt-8" />
      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden mt-6 p-6">
        {autoDisabled && (
          <Alert
            type="warning"
            title="Mises à jour automatiques des contenus désactivées"
            message={
              status?.autoDisabledReason ||
              'Les mises à jour automatiques des contenus ont été désactivées après plusieurs échecs.'
            }
            variant="bordered"
            className="mb-4"
          />
        )}

        <Switch
          checked={enabled}
          onChange={(value) => toggleMutation.mutate(value)}
          disabled={toggleMutation.isPending || isLoading}
          label="Activer les mises à jour automatiques des contenus"
          description="Télécharge automatiquement les nouvelles versions des contenus installés de la Bibliothèque d'information (fichiers ZIM) et des cartes pendant le créneau choisi. Ces téléchargements peuvent être très volumineux : fixez un plafond de données par créneau pour limiter ce qui est récupéré d'un coup. Nous conseillons au moins 0,5 Go par créneau pour que la plupart des mises à jour passent rapidement, mais vous pouvez fixer un plafond plus bas si votre bande passante est très limitée et que vous acceptez que certaines mises à jour soient reportées (elles restent visibles et peuvent être faites à la main). Si une mise à jour échoue plusieurs fois dans le créneau, elle est automatiquement désactivée et devra être réactivée manuellement."
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            name="contentWindowStart"
            label="Début du créneau"
            type="time"
            value={windowStart}
            onChange={(e) => setWindowStart(e.target.value)}
            disabled={!enabled}
            helpText="Heure locale du serveur"
          />
          <Input
            name="contentWindowEnd"
            label="Fin du créneau"
            type="time"
            value={windowEnd}
            onChange={(e) => setWindowEnd(e.target.value)}
            disabled={!enabled}
            helpText="Heure locale du serveur"
          />
          <div>
            <label
              htmlFor="contentCooloff"
              className="block text-base/6 font-medium text-text-primary"
            >
              Délai de carence
            </label>
            <p className="mt-1 text-sm text-text-muted">Délai après l'apparition d'une nouvelle version</p>
            <select
              id="contentCooloff"
              value={cooloff}
              onChange={(e) => setCooloff(Number(e.target.value))}
              disabled={!enabled}
              className="mt-1.5 block w-full rounded-md bg-surface-primary px-3 py-2 text-base text-text-primary border border-border-default focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6 disabled:opacity-50"
            >
              {COOLOFF_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            name="contentDataCap"
            label="Plafond de données (Go)"
            type="number"
            min="0"
            step="1"
            value={capGb}
            onChange={(e) => setCapGb(e.target.value)}
            disabled={!enabled}
            helpText="Par créneau. 0 = illimité"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <StyledButton variant="primary" size="sm" onClick={handleSaveSchedule} disabled={!enabled}>
            Enregistrer la planification
          </StyledButton>
        </div>

        {enabled && status && (
          <div className="mt-6 pt-4 border-t border-desert-stone-light text-sm">
            <p className="text-desert-stone mb-3">
              <span className="font-medium">Créneau de mise à jour : </span>
              {status.windowStart}–{status.windowEnd} (
              {status.withinWindow ? 'actuellement dedans' : 'actuellement hors créneau'}) ; carence{' '}
              {status.cooloffHours} h ; plafond{' '}
              {status.maxBytesPerWindow > 0 ? formatBytes(status.maxBytesPerWindow) : 'illimité'}
              {status.maxBytesPerWindow > 0 && (
                <> ({formatBytes(status.windowBytesUsed)} utilisés dans ce créneau)</>
              )}
              .
              {status.lastResult && (
                <>
                  {' '}
                  <span className="font-medium">Dernière exécution : </span>
                  {status.lastResult}
                  {status.lastAttemptAt
                    ? ` (${new Date(status.lastAttemptAt).toLocaleString('fr-FR')})`
                    : ''}
                </>
              )}
            </p>

            {status.lastError && (
              <p className="text-desert-red mb-3">
                <span className="font-medium">Dernière erreur : </span>
                {status.lastError}
              </p>
            )}

            {status.resources.length === 0 ? (
              <p className="text-desert-stone-dark">
                Tous les contenus installés sont à jour. Les nouvelles versions apparaîtront ici dès leur détection.
              </p>
            ) : (
              <ul className="space-y-2">
                {status.resources.map((resource) => (
                  <li
                    key={`${resource.resource_type}:${resource.resource_id}`}
                    className="flex items-start justify-between gap-4 rounded-md bg-surface-secondary px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {resource.resource_id}{' '}
                        <span className="text-xs uppercase text-desert-stone">
                          {resource.resource_type}
                        </span>
                      </p>
                      <p className="text-desert-stone">
                        {resource.current_version}
                        {resource.available_update_version
                          ? ` → ${resource.available_update_version}`
                          : ' (à jour)'}
                        {resource.size_bytes ? ` · ${formatBytes(resource.size_bytes)}` : ''}
                      </p>
                      {resource.auto_disabled_reason && (
                        <p className="text-desert-red mt-0.5">{resource.auto_disabled_reason}</p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium ${resource.exceeds_cap
                          ? 'text-desert-red'
                          : resource.eligible
                            ? 'text-desert-green'
                            : 'text-desert-stone'
                        }`}
                    >
                      {resource.exceeds_cap ? 'Ignorée — dépasse le plafond de données, à mettre à jour manuellement' : resource.reason}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  )
}
