import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'
import CreatorPacksSection from '~/components/CreatorPacksSection'
import ActiveDownloads from '~/components/ActiveDownloads'
import useCreatorPacks from '~/hooks/useCreatorPacks'

export default function CreatorPacksPage() {
  const { configured } = useCreatorPacks()

  return (
    <SettingsLayout>
      <Head title="Packs de créateurs" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <h1 className="text-4xl font-semibold mb-2">Packs de créateurs</h1>
          <p className="text-text-muted mb-4">
            Installez des collections de vidéos de créateurs. Les packs se téléchargent en arrière-plan
            et se regardent hors ligne via Kiwix.
          </p>

          {configured ? (
            <>
              <CreatorPacksSection allowUninstall />
              <div className="mt-10">
                <ActiveDownloads filetype="zim" withHeader />
              </div>
            </>
          ) : (
            <p className="text-text-muted mt-4">
              Les packs de créateurs ne sont pas disponibles dans cette version.
            </p>
          )}
        </main>
      </div>
    </SettingsLayout>
  )
}
