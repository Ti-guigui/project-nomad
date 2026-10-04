import { Head } from '@inertiajs/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import StyledTable from '~/components/StyledTable'
import SettingsLayout from '~/layouts/SettingsLayout'
import api from '~/lib/api'
import StyledButton from '~/components/StyledButton'
import { useModals } from '~/context/ModalContext'
import StyledModal from '~/components/StyledModal'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import Alert from '~/components/Alert'
import { useNotifications } from '~/context/NotificationContext'
import ZimUploader from '~/components/ZimUploader'
import { ZimFileWithMetadata } from '../../../../types/zim'
import { SERVICE_NAMES } from '../../../../constants/service_names'
import { formatBytes } from '~/lib/util'
import { IconArrowDown, IconArrowUp, IconArrowsSort } from '@tabler/icons-react'

type SortKey = 'name' | 'size'
type SortDirection = 'asc' | 'desc'

export default function ZimPage() {
  const queryClient = useQueryClient()
  const { openModal, closeAllModals } = useModals()
  const { addNotification } = useNotifications()
  const { isInstalled } = useServiceInstalledStatus(SERVICE_NAMES.KIWIX)
  const [sortKey, setSortKey] = useState<SortKey>('size')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [showUploader, setShowUploader] = useState(false)
  const { data, isLoading } = useQuery<ZimFileWithMetadata[]>({
    queryKey: ['zim-files'],
    queryFn: getFiles,
    refetchOnWindowFocus: false,
  })

  async function getFiles() {
    const res = await api.listZimFiles()
    return res.data.files
  }

  const sortedData = useMemo(() => {
    if (!data) return []
    const copy = [...data]
    copy.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'size') {
        const aSize = a.size_bytes ?? 0
        const bSize = b.size_bytes ?? 0
        cmp = aSize - bSize
      } else {
        const aName = (a.title || a.name).toLowerCase()
        const bName = (b.title || b.name).toLowerCase()
        cmp = aName.localeCompare(bName)
      }
      return sortDirection === 'asc' ? cmp : -cmp
    })
    return copy
  }, [data, sortKey, sortDirection])

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection(key === 'size' ? 'desc' : 'asc')
    }
  }

  function renderSortHeader(label: string, key: SortKey) {
    const active = sortKey === key
    const Icon = !active ? IconArrowsSort : sortDirection === 'asc' ? IconArrowUp : IconArrowDown
    return (
      <button
        type="button"
        onClick={() => toggleSort(key)}
        className="flex items-center gap-1 font-semibold text-text-primary hover:text-desert-orange"
      >
        {label}
        <Icon className="size-4" />
      </button>
    )
  }

  async function confirmDeleteFile(file: ZimFileWithMetadata) {
    openModal(
      <StyledModal
        title="Confirmer la suppression ?"
        onConfirm={() => {
          deleteFileMutation.mutateAsync(file)
          closeAllModals()
        }}
        onCancel={closeAllModals}
        open={true}
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmVariant="danger"
      >
        <p className="text-text-secondary">
          Voulez-vous vraiment supprimer {file.name} ? Cette action est irréversible.
        </p>
      </StyledModal>,
      'confirm-delete-file-modal'
    )
  }

  const deleteFileMutation = useMutation({
    mutationFn: async (file: ZimFileWithMetadata) => api.deleteZimFile(file.name.replace('.zim', '')),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['zim-files'] })
    },
  })

  const rescanMutation = useMutation({
    mutationFn: async () => api.rescanZimLibrary(),
    onSuccess: (result) => {
      // catchInternal returns undefined on error (and shows its own error toast)
      if (!result) return
      queryClient.invalidateQueries({ queryKey: ['zim-files'] })
      addNotification({
        type: 'success',
        message:
          result.added > 0
            ? `${result.added} ${result.added === 1 ? 'nouvel ouvrage trouvé' : 'nouveaux ouvrages trouvés'}. La bibliothèque en compte maintenant ${result.after}.`
            : `La bibliothèque est à jour (${result.after} ${result.after === 1 ? 'ouvrage' : 'ouvrages'}).`,
      })
    },
  })

  return (
    <SettingsLayout>
      <Head title="Gestionnaire de contenus | Project NOMAD" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold mb-2">Gestionnaire de contenus</h1>
              <p className="text-text-muted">
                Gérez vos fichiers de contenus stockés.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <StyledButton
                variant="secondary"
                icon={showUploader ? 'IconX' : 'IconUpload'}
                onClick={() => setShowUploader((v) => !v)}
              >
                {showUploader ? "Masquer l'envoi" : 'Envoyer un fichier ZIM'}
              </StyledButton>
              {isInstalled && (
                <StyledButton
                  variant="secondary"
                  icon={'IconRefresh'}
                  loading={rescanMutation.isPending}
                  title="Reconstruit l'index de la bibliothèque Kiwix à partir des fichiers sur le disque. À utiliser après avoir ajouté des fichiers ZIM à la main, en dehors de NOMAD."
                  onClick={() => rescanMutation.mutate()}
                >
                  Réanalyser la bibliothèque
                </StyledButton>
              )}
            </div>
          </div>
          {showUploader && (
            <div className="mt-6">
              <p className="text-text-muted text-sm mb-3">
                Envoyez un fichier ZIM depuis votre navigateur. Les fichiers jusqu'à 20 Go sont acceptés. Pour de meilleurs résultats, envoyez-le depuis la même machine ou via une connexion locale stable. Les fichiers plus gros doivent être copiés directement sur le volume de stockage.
              </p>
              <ZimUploader
                existingFilenames={data?.map((f) => f.name) ?? []}
                onUploadComplete={(added) => {
                  queryClient.invalidateQueries({ queryKey: ['zim-files'] })
                  queryClient.invalidateQueries({ queryKey: ['wikipedia-state'] })
                  queryClient.invalidateQueries({ queryKey: ['curated-categories'] })
                  setShowUploader(false)
                  addNotification({
                    type: 'success',
                    message:
                      added > 0
                        ? `Envoi terminé. ${added} ${added === 1 ? 'nouvel ouvrage ajouté' : 'nouveaux ouvrages ajoutés'} à la bibliothèque.`
                        : 'Envoi terminé. La bibliothèque est à jour.',
                  })
                }}
              />
            </div>
          )}
          {!isInstalled && (
            <Alert
              title="L'application Kiwix n'est pas installée. Installez-la pour voir les fichiers ZIM téléchargés"
              type="warning"
              variant='solid'
              className="!mt-6"
            />
          )}
          <StyledTable<ZimFileWithMetadata & { actions?: any }>
            className="font-semibold mt-4"
            rowLines={true}
            loading={isLoading}
            compact
            columns={[
              {
                accessor: 'title',
                title: renderSortHeader('Titre', 'name'),
                render: (record) => (
                  <span className="font-medium">
                    {record.title || record.name}
                  </span>
                ),
              },
              {
                accessor: 'summary',
                title: 'Résumé',
                render: (record) => (
                  <span className="text-text-secondary text-sm line-clamp-2">
                    {record.summary || '—'}
                  </span>
                ),
              },
              {
                accessor: 'size_bytes',
                title: renderSortHeader('Taille', 'size'),
                render: (record) => (
                  <span className="text-text-secondary tabular-nums">
                    {record.size_bytes ? formatBytes(record.size_bytes, 1) : '—'}
                  </span>
                ),
              },
              {
                accessor: 'actions',
                title: 'Actions',
                render: (record) => (
                  <div className="flex space-x-2">
                    <StyledButton
                      variant="danger"
                      icon={'IconTrash'}
                      onClick={() => {
                        confirmDeleteFile(record)
                      }}
                    >
                      Supprimer
                    </StyledButton>
                  </div>
                ),
              },
            ]}
            data={sortedData}
          />
        </main>
      </div>
    </SettingsLayout>
  )
}
