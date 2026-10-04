import { useState } from 'react'
import { IconMovie } from '@tabler/icons-react'
import api from '~/lib/api'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import useDownloads from '~/hooks/useDownloads'
import { useNotifications } from '~/context/NotificationContext'
import CreatorPackCard from '~/components/CreatorPackCard'
import StyledModal from '~/components/StyledModal'
import { formatBytes } from '~/lib/util'
import type { CreatorPackWithStatus } from '../../types/collections'

// Canonical Creator Pack License (one license across the seed packs). Opened in a
// new tab from the install modal; install is an online action so an external link
// is fine. A per-pack catalog `license_url` can supersede this later if needed.
const LICENSE_URL =
  'https://github.com/Crosstalk-Solutions/project-nomad/blob/main/collections/creator-pack-license.md'

export interface CreatorPacksSectionProps {
  /** Show uninstall controls on installed packs (the settings "manage" surface). */
  allowUninstall?: boolean
}

/**
 * Install-on-click grid of Creator Packs + confirm modals. Shared by the Content
 * Explorer block and the /settings/creator-packs page. Renders NOTHING when the
 * build isn't configured (fork / key unset) — a fork never sees a broken install
 * button. The Easy Setup wizard does NOT use this (it needs selection semantics,
 * not install-on-click) and drives CreatorPackCard itself.
 */
const CreatorPacksSection: React.FC<CreatorPacksSectionProps> = ({ allowUninstall }) => {
  const { configured, packs, invalidate: invalidateCreatorPacks } = useCreatorPacks()
  const { invalidate: invalidateDownloads } = useDownloads({ filetype: 'zim' })
  const { addNotification } = useNotifications()

  const [packToInstall, setPackToInstall] = useState<CreatorPackWithStatus | null>(null)
  const [installing, setInstalling] = useState(false)
  const [packToUninstall, setPackToUninstall] = useState<CreatorPackWithStatus | null>(null)
  const [uninstalling, setUninstalling] = useState(false)

  if (!configured) return null

  const handleConfirmInstall = async () => {
    if (!packToInstall) return
    setInstalling(true)
    try {
      await api.installCreatorPack(packToInstall.id)
      addNotification({ message: `Installation de « ${packToInstall.name} » lancée`, type: 'success' })
      invalidateCreatorPacks()
      invalidateDownloads()
      setPackToInstall(null)
    } catch (error) {
      console.error('Error installing creator pack:', error)
      addNotification({ message: "Une erreur est survenue au lancement de l'installation.", type: 'error' })
    } finally {
      setInstalling(false)
    }
  }

  const handleConfirmUninstall = async () => {
    if (!packToUninstall) return
    setUninstalling(true)
    try {
      await api.uninstallCreatorPack(packToUninstall.id)
      addNotification({ message: `« ${packToUninstall.name} » désinstallé`, type: 'success' })
      invalidateCreatorPacks()
      invalidateDownloads()
      setPackToUninstall(null)
    } catch (error) {
      console.error('Error uninstalling creator pack:', error)
      addNotification({ message: 'Une erreur est survenue pendant la désinstallation.', type: 'error' })
    } finally {
      setUninstalling(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-3 mt-8 mb-4">
        <div className="w-10 h-10 rounded-full bg-surface-primary border border-border-subtle flex items-center justify-center shadow-sm">
          <IconMovie className="w-6 h-6 text-text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Packs de créateurs</h3>
          <p className="text-sm text-text-muted">
            Des collections de vidéos de créateurs, à regarder hors ligne
          </p>
        </div>
      </div>

      {packs.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {packs.map((pack) => (
            <CreatorPackCard
              key={pack.id}
              pack={pack}
              onClick={setPackToInstall}
              onUninstall={allowUninstall ? setPackToUninstall : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-text-muted mt-4">Aucun pack de créateur disponible.</p>
      )}

      <StyledModal
        open={!!packToInstall}
        title={packToInstall ? `Installer ${packToInstall.name} ?` : 'Installer un pack de créateur'}
        onClose={() => !installing && setPackToInstall(null)}
        onCancel={() => setPackToInstall(null)}
        onConfirm={handleConfirmInstall}
        confirmText={packToInstall?.available_update_version ? 'Mettre à jour le pack' : 'Installer le pack'}
        confirmIcon="IconDownload"
        confirmLoading={installing}
        icon={<IconMovie className="w-6 h-6" />}
      >
        {packToInstall && (
          <div className="space-y-3 text-text-secondary">
            <p>
              {packToInstall.video_count} vidéos de {packToInstall.creator}, environ{' '}
              {formatBytes(packToInstall.size_mb * 1024 * 1024, 0)}. Le téléchargement se fait en
              arrière-plan et le pack apparaîtra dans Kiwix une fois prêt.
            </p>
            <p className="text-sm text-text-muted">
              Contenu sous licence — usage personnel, redistribution interdite.{' '}
              <a
                href={LICENSE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-desert-green underline hover:no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Voir la licence
              </a>
            </p>
          </div>
        )}
      </StyledModal>

      <StyledModal
        open={!!packToUninstall}
        title={packToUninstall ? `Désinstaller ${packToUninstall.name} ?` : 'Désinstaller un pack de créateur'}
        onClose={() => !uninstalling && setPackToUninstall(null)}
        onCancel={() => setPackToUninstall(null)}
        onConfirm={handleConfirmUninstall}
        confirmText="Désinstaller le pack"
        confirmIcon="IconTrash"
        confirmVariant="danger"
        confirmLoading={uninstalling}
        icon={<IconMovie className="w-6 h-6" />}
      >
        {packToUninstall && (
          <p className="text-text-secondary">
            Les vidéos téléchargées (
            {formatBytes(packToUninstall.size_mb * 1024 * 1024, 0)}) seront supprimées de ce NOMAD.
            Vous pourrez réinstaller le pack à tout moment.
          </p>
        )}
      </StyledModal>
    </>
  )
}

export default CreatorPacksSection
