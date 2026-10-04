import { Head, router } from '@inertiajs/react'
import StyledTable from '~/components/StyledTable'
import SettingsLayout from '~/layouts/SettingsLayout'
import StyledButton from '~/components/StyledButton'
import { useModals } from '~/context/ModalContext'
import StyledModal from '~/components/StyledModal'
import { FileEntry } from '../../../types/files'
import { useNotifications } from '~/context/NotificationContext'
import { useEffect, useRef, useState } from 'react'
import api from '~/lib/api'
import DownloadURLModal from '~/components/DownloadURLModal'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useDownloads from '~/hooks/useDownloads'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import CuratedCollectionCard from '~/components/CuratedCollectionCard'
import CountryPickerModal from '~/components/CountryPickerModal'
import type { CollectionWithStatus } from '../../../types/collections'
import ActiveDownloads from '~/components/ActiveDownloads'
import Alert from '~/components/Alert'
import { formatBytes } from '~/lib/util'
import { hasDownloadedGlobalMap } from '~/lib/global_map_banner'

const CURATED_COLLECTIONS_KEY = 'curated-map-collections'
const GLOBAL_MAP_INFO_KEY = 'global-map-info'

export default function MapsManager(props: {
  maps: { baseAssetsExist: boolean; worldBasemapExists: boolean; regionFiles: FileEntry[] }
}) {
  const queryClient = useQueryClient()
  const { openModal, closeAllModals } = useModals()
  const { addNotification } = useNotifications()
  const [downloading, setDownloading] = useState(false)
  const [deletingFileKey, setDeletingFileKey] = useState<string | null>(null)

  const { data: curatedCollections } = useQuery({
    queryKey: [CURATED_COLLECTIONS_KEY],
    queryFn: () => api.listCuratedMapCollections(),
    refetchOnWindowFocus: false,
  })

  const { data: activeMapDownloads = [], invalidate: invalidateDownloads } = useDownloads({
    filetype: 'map',
    enabled: true,
  })

  // Refresh the Stored Map Files list when a map download finishes. We pass props.maps.regionFiles
  // straight through from the server-side render, so without an Inertia partial reload it stays stale
  // until the user navigates away and back.
  const prevMapDownloadCountRef = useRef(activeMapDownloads.length)
  useEffect(() => {
    if (activeMapDownloads.length < prevMapDownloadCountRef.current) {
      router.reload({ only: ['maps'] })
    }
    prevMapDownloadCountRef.current = activeMapDownloads.length
  }, [activeMapDownloads.length])

  const { data: globalMapInfo } = useQuery({
    queryKey: [GLOBAL_MAP_INFO_KEY],
    queryFn: () => api.getGlobalMapInfo(),
    refetchOnWindowFocus: false,
  })
  const globalMapAlreadyDownloaded = hasDownloadedGlobalMap(globalMapInfo?.key, props.maps.regionFiles)

  const setupWorldBasemap = useMutation({
    mutationFn: () => api.setupWorldBasemap(),
    onSuccess: () => {
      addNotification({
        type: 'success',
        message: 'Carte de base téléchargée.',
      })
      router.reload({ only: ['maps'] })
    },
    onError: () => {
      addNotification({
        type: 'error',
        message:
          'Impossible de télécharger la carte de base. Connectez ce NOMAD à internet et réessayez.',
      })
    },
  })

  const downloadGlobalMap = useMutation({
    mutationFn: () => api.downloadGlobalMap(),
    onSuccess: () => {
      invalidateDownloads()
      addNotification({
        type: 'success',
        message: 'Le téléchargement de la carte mondiale est en file d’attente. C’est un très gros fichier (~125 Go) : cela peut prendre du temps.',
      })
      closeAllModals()
    },
    onError: (error) => {
      console.error('Error downloading global map:', error)
      addNotification({
        type: 'error',
        message: 'Impossible de lancer le téléchargement de la carte mondiale. Veuillez réessayer.',
      })
    },
  })

  async function downloadBaseAssets() {
    try {
      setDownloading(true)

      const res = await api.downloadBaseMapAssets()
      if (!res) {
        throw new Error('Une erreur inconnue est survenue lors du téléchargement des ressources de base.')
      }

      if (res.success) {
        addNotification({
          type: 'success',
          message: 'Ressources de base des cartes téléchargées.',
        })
        router.reload()
      }
    } catch (error) {
      console.error('Error downloading base assets:', error)
      addNotification({
        type: 'error',
        message: 'Une erreur est survenue lors du téléchargement des ressources de base. Veuillez réessayer.',
      })
    } finally {
      setDownloading(false)
    }
  }

  async function downloadCollection(record: CollectionWithStatus) {
    try {
      await api.downloadMapCollection(record.slug)
      invalidateDownloads()
      addNotification({
        type: 'success',
        message: `Téléchargement de la collection « ${record.name} » mis en file d’attente.`,
      })
    } catch (error) {
      console.error('Error downloading collection:', error)
    }
  }

  async function downloadCustomFile(url: string) {
    try {
      await api.downloadRemoteMapRegion(url)
      invalidateDownloads()
      addNotification({
        type: 'success',
        message: 'Téléchargement mis en file d’attente.',
      })
    } catch (error) {
      console.error('Error downloading custom file:', error)
    }
  }

  async function deleteFile(file: FileEntry) {
    if (file.type !== 'file') return

    try {
      setDeletingFileKey(file.key)
      await api.deleteMapRegionFile(file.name)
      addNotification({
        type: 'success',
        message: `${file.name} a été supprimé.`,
      })
      closeAllModals()
      router.reload({ only: ['maps'] })
    } catch (error) {
      console.error('Error deleting map file:', error)
      addNotification({
        type: 'error',
        message: `Impossible de supprimer ${file.name}. Veuillez réessayer.`,
      })
    } finally {
      setDeletingFileKey(null)
    }
  }

  async function confirmDeleteFile(file: FileEntry) {
    openModal(
      <StyledModal
        title="Confirmer la suppression ?"
        onConfirm={() => deleteFile(file)}
        onCancel={closeAllModals}
        open={true}
        confirmText="Supprimer"
        cancelText="Annuler"
        confirmVariant="danger"
        confirmLoading={file.type === 'file' && deletingFileKey === file.key}
      >
        <p className="text-text-secondary">
          Voulez-vous vraiment supprimer {file.name} ? Cette action est irréversible.
        </p>
      </StyledModal>,
      'confirm-delete-file-modal'
    )
  }

  async function confirmDownload(record: CollectionWithStatus) {
    const isCollection = 'resources' in record
    openModal(
      <StyledModal
        title="Confirmer le téléchargement ?"
        onConfirm={() => {
          if (isCollection) {
            if (record.all_installed) {
              addNotification({
                message: `Toutes les ressources de la collection « ${record.name} » sont déjà téléchargées.`,
                type: 'info',
              })
              return
            }
            downloadCollection(record)
          }
          closeAllModals()
        }}
        onCancel={closeAllModals}
        open={true}
        confirmText="Télécharger"
        cancelText="Annuler"
        confirmVariant="primary"
      >
        <p className="text-text-secondary">
          Voulez-vous vraiment télécharger <strong>{isCollection ? record.name : record}</strong> ?
          La disponibilité peut prendre du temps selon la taille du fichier et votre connexion
          internet.
        </p>
      </StyledModal>,
      'confirm-download-file-modal'
    )
  }

  async function confirmGlobalMapDownload() {
    if (!globalMapInfo) return
    openModal(
      <StyledModal
        title="Télécharger la carte mondiale ?"
        onConfirm={() => downloadGlobalMap.mutate()}
        onCancel={closeAllModals}
        open={true}
        confirmText="Télécharger"
        cancelText="Annuler"
        confirmVariant="primary"
        confirmLoading={downloadGlobalMap.isPending}
      >
        <p className="text-text-secondary">
          La carte mondiale complète de Protomaps va être téléchargée ({formatBytes(globalMapInfo.size, 1)}, version du {globalMapInfo.date}).
          Elle couvre toute la planète : plus besoin de fichiers par région.
          Vérifiez que vous avez assez d'espace disque.
        </p>
      </StyledModal>,
      'confirm-global-map-download-modal'
    )
  }

  function openCountryPickerModal() {
    openModal(
      <CountryPickerModal
        onCancel={closeAllModals}
        installedFilenames={(props.maps.regionFiles ?? []).map((f) => f.name)}
        onDownloadStart={() => {
          invalidateDownloads()
          addNotification({
            type: 'success',
            message: 'Téléchargement en file d’attente. Suivez l’avancement ci-dessous.',
          })
          closeAllModals()
        }}
      />,
      'country-picker-modal'
    )
  }

  async function openDownloadModal() {
    openModal(
      <DownloadURLModal
        title="Télécharger un fichier de carte"
        suggestedURL="ex. https://github.com/Ti-guigui/project-nomad/releases/download/cartes-fr/bretagne_2026-10.pmtiles"
        onCancel={() => closeAllModals()}
        onPreflightSuccess={async (url) => {
          await downloadCustomFile(url)
          closeAllModals()
        }}
      />,
      'download-map-file-modal'
    )
  }

  const refreshManifests = useMutation({
    mutationFn: () => api.refreshManifests(),
    onSuccess: () => {
      addNotification({
        message: 'Collections de cartes actualisées.',
        type: 'success',
      })
      queryClient.invalidateQueries({ queryKey: [CURATED_COLLECTIONS_KEY] })
    },
  })

  return (
    <SettingsLayout>
      <Head title="Gestionnaire de cartes" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-4xl font-semibold mb-2">Gestionnaire de cartes</h1>
              <p className="text-text-muted">Gérez vos fichiers de cartes et découvrez de nouvelles régions !</p>
            </div>
            <div className="flex space-x-4">

            </div>
          </div>
          {!props.maps.baseAssetsExist && (
            <Alert
              title="Les ressources de base des cartes ne sont pas installées. Téléchargez-les d'abord pour activer les cartes."
              type="warning"
              variant="solid"
              className="my-4"
              buttonProps={{
                variant: 'secondary',
                children: 'Télécharger les ressources de base',
                icon: 'IconDownload',
                loading: downloading,
                onClick: () => downloadBaseAssets(),
              }}
            />
          )}
          {props.maps.baseAssetsExist && !props.maps.worldBasemapExists && (
            <Alert
              title="Carte du monde de base non téléchargée"
              message="La carte du monde à faible zoom (~15 Mo) n'est pas encore téléchargée : la carte apparaît vide en dehors des régions téléchargées. Connectez ce NOMAD à internet et téléchargez-la une fois pour l'utiliser hors ligne."
              type="warning"
              variant="solid"
              className="my-4"
              buttonProps={{
                variant: 'secondary',
                children: 'Télécharger la carte de base',
                icon: 'IconCloudDownload',
                loading: setupWorldBasemap.isPending,
                onClick: () => setupWorldBasemap.mutate(),
              }}
            />
          )}
          {globalMapInfo && globalMapAlreadyDownloaded && (
            <Alert
              title="Carte mondiale installée"
              message={`Votre carte mondiale du ${globalMapInfo.date} (${formatBytes(globalMapInfo.size, 1)}) est stockée localement et prête pour un usage hors ligne.`}
              type="success"
              variant="bordered"
              className="mt-8"
              icon="IconCircleCheck"
              buttonProps={{
                variant: 'secondary',
                children: 'Télécharger la dernière version',
                icon: 'IconRefresh',
                onClick: () => confirmGlobalMapDownload(),
              }}
            />
          )}
          {globalMapInfo && !globalMapAlreadyDownloaded && (
            <Alert
              title="Carte mondiale disponible"
              message={`Téléchargez une carte complète du monde depuis Protomaps (${formatBytes(globalMapInfo.size, 1)}, version du ${globalMapInfo.date}). C'est un très gros fichier, mais il couvre toute la planète — plus besoin de télécharger les régions une par une.`}
              type="info-inverted"
              variant="bordered"
              className="mt-8"
              icon="IconWorld"
              buttonProps={{
                variant: 'primary',
                children: 'Télécharger la carte mondiale',
                icon: 'IconCloudDownload',
                loading: downloadGlobalMap.isPending,
                onClick: () => confirmGlobalMapDownload(),
              }}
            />
          )}
          <Alert
            title="Télécharger par pays ou par territoire"
            message="Choisissez uniquement ce dont vous avez besoin — la France métropolitaine, un territoire d'outre-mer, un pays ou tout un continent — et seules ces tuiles seront extraites de l'archive mondiale Protomaps. Bien plus léger que la carte mondiale complète de 125 Go."
            type="info-inverted"
            variant="bordered"
            className="mt-8"
            icon="IconMap2"
            buttonProps={{
              variant: 'primary',
              children: 'Choisir des pays',
              icon: 'IconMap2',
              onClick: openCountryPickerModal,
            }}
          />

          <div className="mt-8 mb-6 flex items-center justify-between">
            <StyledSectionHeader title="Régions sélectionnées (France et outre-mer)" className="!mb-0" />
            <StyledButton
              onClick={() => refreshManifests.mutate()}
              disabled={refreshManifests.isPending}
              icon="IconRefresh"
            >
              Actualiser les collections
            </StyledButton>
          </div>
          <div className="!mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curatedCollections?.map((collection) => (
              <CuratedCollectionCard
                key={collection.slug}
                collection={collection}
                onClick={(collection) => confirmDownload(collection)}
              />
            ))}
            {curatedCollections && curatedCollections.length === 0 && (
              <p className="text-text-muted">Aucune collection disponible.</p>
            )}
          </div>
          <div className="mt-12 mb-6 flex items-center justify-between">
            <StyledSectionHeader title="Fichiers de cartes stockés" className="!mb-0" />
            <StyledButton
              variant="primary"
              onClick={openDownloadModal}
              loading={downloading}
              icon="IconCloudDownload"
            >
              Télécharger un fichier de carte personnalisé
            </StyledButton>
          </div>
          <StyledTable<FileEntry & { actions?: any }>
            className="font-semibold mt-4"
            rowLines={true}
            loading={false}
            compact
            columns={[
              { accessor: 'name', title: 'Nom' },
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
            data={props.maps.regionFiles || []}
          />
          <ActiveDownloads filetype="map" withHeader />
        </main>
      </div>
    </SettingsLayout>
  )
}
