import { useEffect, useState } from 'react'
import StyledButton from '~/components/StyledButton'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import Alert from '~/components/Alert'
import api from '~/lib/api'
import Input from '~/components/inputs/Input'
import Switch from '~/components/inputs/Switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { useAutoUpdateStatus } from '~/hooks/useAutoUpdateStatus'

const COOLOFF_OPTIONS = [
  { value: 24, label: '24 heures (1 jour)' },
  { value: 48, label: '48 heures (2 jours)' },
  { value: 72, label: '72 heures (3 jours)' },
  { value: 168, label: '7 jours' },
]

export default function CoreAutoUpdateSection() {
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const { data: status, isLoading } = useAutoUpdateStatus()

  const [windowStart, setWindowStart] = useState('02:00')
  const [windowEnd, setWindowEnd] = useState('05:00')
  const [cooloff, setCooloff] = useState(72)

  // Seed editable fields once the persisted status loads.
  useEffect(() => {
    if (status) {
      setWindowStart(status.windowStart)
      setWindowEnd(status.windowEnd)
      setCooloff(status.cooloffHours)
    }
  }, [status?.windowStart, status?.windowEnd, status?.cooloffHours])

  const saveMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: any }) => api.updateSetting(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Impossible de modifier le réglage de mise à jour automatique.' })
    },
  })

  const enabled = status?.enabled ?? false
  const autoDisabled = !!status?.autoDisabledReason

  const handleToggle = (value: boolean) => {
    saveMutation.mutate(
      { key: 'autoUpdate.enabled', value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
          addNotification({
            type: 'success',
            message: value ? 'Mises à jour automatiques activées.' : 'Mises à jour automatiques désactivées.',
          })
        },
      }
    )
  }

  const handleSaveWindow = async () => {
    try {
      await api.updateSetting('autoUpdate.windowStart', windowStart)
      await api.updateSetting('autoUpdate.windowEnd', windowEnd)
      await api.updateSetting('autoUpdate.cooloffHours', String(cooloff))
      queryClient.invalidateQueries({ queryKey: ['auto-update-status'] })
      addNotification({ type: 'success', message: 'Planification des mises à jour enregistrée.' })
    } catch {
      addNotification({ type: 'error', message: "Impossible d'enregistrer la planification des mises à jour." })
    }
  }

  return (
    <>
      <StyledSectionHeader title="Mises à jour automatiques du logiciel" className="mt-8" />
      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden mt-6 p-6">
        {autoDisabled && (
          <Alert
            type="warning"
            title="Mises à jour automatiques du logiciel désactivées"
            message={status?.autoDisabledReason || 'Les mises à jour automatiques du logiciel ont été désactivées après plusieurs échecs.'}
            variant="bordered"
            className="mb-4"
          />
        )}

        <Switch
          checked={enabled}
          onChange={handleToggle}
          disabled={saveMutation.isPending || isLoading}
          label="Activer les mises à jour automatiques du logiciel"
          description="Installe automatiquement les versions mineures et correctives pendant le créneau choisi. Les versions majeures demandent toujours une mise à jour manuelle, car elles peuvent introduire des changements incompatibles."
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            name="autoUpdateWindowStart"
            label="Début du créneau"
            type="time"
            value={windowStart}
            onChange={(e) => setWindowStart(e.target.value)}
            disabled={!enabled}
            helpText="Heure locale du serveur"
          />
          <Input
            name="autoUpdateWindowEnd"
            label="Fin du créneau"
            type="time"
            value={windowEnd}
            onChange={(e) => setWindowEnd(e.target.value)}
            disabled={!enabled}
            helpText="Heure locale du serveur"
          />
          <div>
            <label
              htmlFor="autoUpdateCooloff"
              className="block text-base/6 font-medium text-text-primary"
            >
              Délai de carence
            </label>
            <p className="mt-1 text-sm text-text-muted">Délai après la publication d'une version</p>
            <select
              id="autoUpdateCooloff"
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
        </div>

        <div className="mt-4 flex justify-end">
          <StyledButton
            variant="primary"
            size="sm"
            onClick={handleSaveWindow}
            disabled={!enabled}
          >
            Enregistrer la planification
          </StyledButton>
        </div>

        {enabled && status && (
          <div className="mt-6 pt-4 border-t border-desert-stone-light text-sm space-y-1">
            <p className="text-desert-stone-dark">
              <span className="font-medium">État : </span>
              {status.eligibleTarget
                ? `Mise à jour éligible prête : ${status.eligibleTarget.version}`
                : 'Aucune mise à jour éligible — le système est à jour, ou la dernière version est majeure ou encore en période de carence.'}
            </p>
            <p className="text-desert-stone">
              <span className="font-medium">Créneau de mise à jour : </span>
              {status.withinWindow ? 'Actuellement dans le créneau' : 'Actuellement hors du créneau'}
            </p>
            {status.lastResult && (
              <p className="text-desert-stone">
                <span className="font-medium">Dernière vérification : </span>
                {status.lastResult}
                {status.lastAttemptAt
                  ? ` (${new Date(status.lastAttemptAt).toLocaleString('fr-FR')})`
                  : ''}
              </p>
            )}
            {status.lastError && (
              <p className="text-desert-red">
                <span className="font-medium">Dernière erreur : </span>
                {status.lastError}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}
