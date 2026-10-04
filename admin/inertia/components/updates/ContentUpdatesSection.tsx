import { useState } from 'react'
import StyledButton from '~/components/StyledButton'
import StyledTable from '~/components/StyledTable'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import ActiveDownloads from '~/components/ActiveDownloads'
import Alert from '~/components/Alert'
import type { ContentUpdateCheckResult, ResourceUpdateInfo } from '../../../types/collections'
import api from '~/lib/api'
import { useQueryClient } from '@tanstack/react-query'
import { useNotifications } from '~/context/NotificationContext'
import { formatBytes } from '~/lib/util'

export default function ContentUpdatesSection() {
  const { addNotification } = useNotifications()
  const queryClient = useQueryClient()
  const [checkResult, setCheckResult] = useState<ContentUpdateCheckResult | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [applyingIds, setApplyingIds] = useState<Set<string>>(new Set())
  const [isApplyingAll, setIsApplyingAll] = useState(false)

  const handleCheck = async () => {
    setIsChecking(true)
    try {
      const result = await api.checkForContentUpdates()
      if (result) {
        setCheckResult(result)
      }
    } catch {
      setCheckResult({
        updates: [],
        checked_at: new Date().toISOString(),
        error: 'Impossible de rechercher les mises à jour des contenus',
      })
    } finally {
      setIsChecking(false)
    }
  }

  const handleApply = async (update: ResourceUpdateInfo) => {
    setApplyingIds((prev) => new Set(prev).add(update.resource_id))
    try {
      const result = await api.applyContentUpdate(update)
      if (result?.success) {
        addNotification({ type: 'success', message: `Mise à jour lancée pour ${update.resource_id}` })
        // Remove from the updates list
        setCheckResult((prev) =>
          prev
            ? { ...prev, updates: prev.updates.filter((u) => u.resource_id !== update.resource_id) }
            : prev
        )
        // Force Active Downloads to refetch now — small updates finish before the next
        // idle poll fires, so without this the user wouldn't see them.
        queryClient.invalidateQueries({ queryKey: ['download-jobs'] })
      } else {
        addNotification({ type: 'error', message: result?.error || 'Impossible de lancer la mise à jour' })
      }
    } catch {
      addNotification({ type: 'error', message: `Impossible de lancer la mise à jour de ${update.resource_id}` })
    } finally {
      setApplyingIds((prev) => {
        const next = new Set(prev)
        next.delete(update.resource_id)
        return next
      })
    }
  }

  const handleApplyAll = async () => {
    if (!checkResult?.updates.length) return
    setIsApplyingAll(true)
    try {
      const result = await api.applyAllContentUpdates(checkResult.updates)
      if (result?.results) {
        const succeeded = result.results.filter((r) => r.success).length
        const failed = result.results.filter((r) => !r.success).length
        if (succeeded > 0) {
          addNotification({ type: 'success', message: `${succeeded} mise(s) à jour lancée(s)` })
        }
        if (failed > 0) {
          addNotification({ type: 'error', message: `${failed} mise(s) à jour n'ont pas pu être lancée(s)` })
        }
        // Remove successful updates from the list
        const successIds = new Set(result.results.filter((r) => r.success).map((r) => r.resource_id))
        setCheckResult((prev) =>
          prev
            ? { ...prev, updates: prev.updates.filter((u) => !successIds.has(u.resource_id)) }
            : prev
        )
        if (successIds.size > 0) {
          queryClient.invalidateQueries({ queryKey: ['download-jobs'] })
        }
      }
    } catch {
      addNotification({ type: 'error', message: "Impossible d'appliquer les mises à jour" })
    } finally {
      setIsApplyingAll(false)
    }
  }

  return (
    <div className="mt-8">
      <StyledSectionHeader title="Mises à jour manuelles des contenus" />

      <div className="bg-surface-primary rounded-lg border shadow-md overflow-hidden p-6">
        <div className="flex items-center justify-between">
          <p className="text-desert-stone-dark">
            Vérifiez si des versions plus récentes de vos fichiers ZIM et cartes installés sont disponibles.
          </p>
          <StyledButton
            variant="primary"
            icon="IconRefresh"
            onClick={handleCheck}
            loading={isChecking}
          >
            Rechercher des mises à jour des contenus
          </StyledButton>
        </div>

        {checkResult?.error && (
          <Alert
            type="warning"
            title="Problème lors de la recherche"
            message={checkResult.error}
            variant="bordered"
            className="my-4"
          />
        )}

        {checkResult && !checkResult.error && checkResult.updates.length === 0 && (
          <Alert
            type="success"
            title="Tous les contenus sont à jour"
            message="Tous vos contenus installés sont dans leur dernière version disponible."
            variant="bordered"
            className="my-4"
          />
        )}

        {checkResult && checkResult.updates.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-desert-stone-dark">
                {checkResult.updates.length} mise(s) à jour disponible(s)
              </p>
              <StyledButton
                variant="primary"
                size="sm"
                icon="IconDownload"
                onClick={handleApplyAll}
                loading={isApplyingAll}
              >
                Tout mettre à jour ({checkResult.updates.length})
              </StyledButton>
            </div>
            <StyledTable
              data={checkResult.updates}
              columns={[
                {
                  accessor: 'resource_id',
                  title: 'Titre',
                  render: (record) => (
                    <span className="font-medium text-desert-green">{record.resource_id}</span>
                  ),
                },
                {
                  accessor: 'resource_type',
                  title: 'Type',
                  render: (record) => (
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${record.resource_type === 'zim'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                        }`}
                    >
                      {record.resource_type === 'zim' ? 'ZIM' : 'Carte'}
                    </span>
                  ),
                },
                {
                  accessor: 'size_bytes',
                  title: 'Taille',
                  render: (record) => (
                    <span className="text-desert-stone-dark">
                      {record.size_bytes ? formatBytes(record.size_bytes, 1) : '—'}
                    </span>
                  ),
                },
                {
                  accessor: 'installed_version',
                  title: 'Version',
                  render: (record) => (
                    <span className="text-desert-stone-dark">
                      {record.installed_version} → {record.latest_version}
                    </span>
                  ),
                },
                {
                  accessor: 'resource_id',
                  title: '',
                  render: (record) => (
                    <StyledButton
                      variant="secondary"
                      size="sm"
                      icon="IconDownload"
                      onClick={() => handleApply(record)}
                      loading={applyingIds.has(record.resource_id)}
                    >
                      Mettre à jour
                    </StyledButton>
                  ),
                },
              ]}
            />
          </div>
        )}

        {checkResult?.checked_at && (
          <p className="text-xs text-desert-stone mt-3">
            Dernière vérification : {new Date(checkResult.checked_at).toLocaleString('fr-FR')}
          </p>
        )}
      </div>

      <ActiveDownloads withHeader />
    </div>
  )
}
