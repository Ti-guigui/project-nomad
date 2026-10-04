import { Head, router } from '@inertiajs/react'
import AppLayout from '~/layouts/AppLayout'
import StyledButton from '~/components/StyledButton'
import Alert from '~/components/Alert'
import useInternetStatus from '~/hooks/useInternetStatus'
import useServiceInstallationActivity from '~/hooks/useServiceInstallationActivity'
import InstallActivityFeed from '~/components/InstallActivityFeed'
import ActiveDownloads from '~/components/ActiveDownloads'
import StyledSectionHeader from '~/components/StyledSectionHeader'

export default function EasySetupWizardComplete() {
  const { isOnline } = useInternetStatus()
  const installActivity = useServiceInstallationActivity()

  return (
    <AppLayout>
      <Head title="Assistant de configuration terminé" />
      {!isOnline && (
        <Alert
          title="Pas de connexion internet"
          message="Vous ne semblez pas connecté à internet. L'installation d'applications et le téléchargement de contenus nécessitent une connexion internet."
          type="warning"
          variant="solid"
          className="mb-8"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-surface-primary rounded-md shadow-md p-6">
          <StyledSectionHeader title="Activité d'installation des applications" className=" mb-4" />
          <InstallActivityFeed
            activity={installActivity}
            className="!shadow-none border-desert-stone-light border"
          />
          <ActiveDownloads withHeader />
          <Alert
            title="Traitement en arrière-plan"
            message="Vous pouvez quitter cette page à tout moment : les installations et téléchargements continuent en arrière-plan ! La Bibliothèque d'information (si installée) peut rester indisponible jusqu'à la fin des premiers téléchargements."
            type="info"
            variant="solid"
            className='mt-12'
          />
          <div className="flex justify-center mt-8 pt-4 border-t border-desert-stone-light">
            <div className="flex space-x-4">
              <StyledButton onClick={() => router.visit('/home')} icon="IconHome">
                Aller à l'accueil
              </StyledButton>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
