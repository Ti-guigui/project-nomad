import StyledSectionHeader from '~/components/StyledSectionHeader'
import Switch from '~/components/inputs/Switch'
import api from '~/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { useAppAutoUpdateStatus } from '~/hooks/useAppAutoUpdateStatus'

export default function AppAutoUpdateSection() {
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const { data: status, isLoading } = useAppAutoUpdateStatus()

  const enabled = status?.enabled ?? false

  const toggleMutation = useMutation({
    mutationFn: (value: boolean) => api.updateSetting('appAutoUpdate.enabled', value),
    onSuccess: (_data, value) => {
      queryClient.invalidateQueries({ queryKey: ['app-auto-update-status'] })
      addNotification({
        type: 'success',
        message: value ? 'Mises à jour automatiques des applications activées.' : 'Mises à jour automatiques des applications désactivées.',
      })
    },
    onError: () => {
      addNotification({ type: 'error', message: 'Impossible de modifier le réglage de mise à jour automatique des applications.' })
    },
  })

  return (
    <>
      <StyledSectionHeader title="Mises à jour automatiques des applications" className="mt-8" />
      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden mt-6 p-6">
        <Switch
          checked={enabled}
          onChange={(value) => toggleMutation.mutate(value)}
          disabled={toggleMutation.isPending || isLoading}
          label="Activer les mises à jour automatiques des applications"
          description="Installe automatiquement les versions mineures et correctives des applications choisies (interrupteur sur chaque application dans le Dépôt d'applications). Les versions majeures demandent toujours une mise à jour manuelle. Utilise le même créneau et le même délai de carence que le logiciel ci-dessus."
        />

        {enabled && status && (
          <div className="mt-6 pt-4 border-t border-desert-stone-light text-sm">
            <p className="text-desert-stone mb-3">
              <span className="font-medium">Créneau de mise à jour : </span>
              {status.windowStart}–{status.windowEnd} (
              {status.withinWindow ? 'actuellement dedans' : 'actuellement hors créneau'}) ; carence{' '}
              {status.cooloffHours} h.
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

            {status.apps.length === 0 ? (
              <p className="text-desert-stone-dark">
                Aucune application n'est encore choisie. Activez la mise à jour automatique sur chaque application depuis le Dépôt d'applications.
              </p>
            ) : (
              <ul className="space-y-2">
                {status.apps.map((app) => (
                  <li
                    key={app.service_name}
                    className="flex items-start justify-between gap-4 rounded-md bg-surface-secondary px-3 py-2"
                  >
                    <div>
                      <p className="font-medium text-text-primary">
                        {app.friendly_name || app.service_name}
                      </p>
                      <p className="text-desert-stone">
                        {app.current_version}
                        {app.available_update_version
                          ? ` → ${app.available_update_version}`
                          : ' (à jour)'}
                      </p>
                      {app.auto_disabled_reason && (
                        <p className="text-desert-red mt-0.5">{app.auto_disabled_reason}</p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 text-xs font-medium ${
                        app.eligible ? 'text-desert-green' : 'text-desert-stone'
                      }`}
                    >
                      {app.reason}
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
