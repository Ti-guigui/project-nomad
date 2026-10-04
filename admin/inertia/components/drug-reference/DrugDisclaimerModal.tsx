import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconAlertTriangle } from '@tabler/icons-react'
import StyledButton from '~/components/StyledButton'

/**
 * localStorage key for the Drug Reference disclaimer acknowledgement. Versioned:
 * bump the suffix if the disclaimer text changes materially so every browser is
 * re-prompted. Per-browser by design — a new browser/device gets the gate again.
 */
export const DRUG_DISCLAIMER_ACK_KEY = 'nomad:drugReferenceDisclaimer:v1'

export function hasAcknowledgedDrugDisclaimer(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(DRUG_DISCLAIMER_ACK_KEY) === 'ack'
  } catch {
    return false
  }
}

/**
 * First-open disclaimer gate for the Drug Reference. Blocks the page until the
 * user acknowledges (no backdrop / Escape dismissal). On acknowledgement the
 * acceptance is saved to this browser's localStorage so it isn't shown again on
 * this browser — other browsers/devices see it on their first open.
 */
export default function DrugDisclaimerModal({ open, onAcknowledge }: { open: boolean; onAcknowledge: () => void }) {
  const acknowledge = () => {
    try {
      window.localStorage.setItem(DRUG_DISCLAIMER_ACK_KEY, 'ack')
    } catch {
      // Private mode / storage disabled — still let them through for this session.
    }
    onAcknowledge()
  }

  return (
    <Dialog open={open} onClose={() => {}} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/60" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <DialogPanel className="relative w-full transform overflow-hidden rounded-lg bg-surface-primary px-5 pb-5 pt-6 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:p-6">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-desert-orange/15 text-desert-orange-dark">
                <IconAlertTriangle size={26} />
              </span>
              <DialogTitle as="h3" className="mt-4 text-lg font-bold text-text-primary">
                Avant d'utiliser le référentiel des médicaments
              </DialogTitle>
            </div>

            <div className="mt-4 space-y-3 text-sm text-text-secondary">
              <p>
                Cet outil affiche des informations de santé générales tirées des <strong>notices officielles
                de la FDA</strong> (agence américaine du médicament) et associe des symptômes à des médicaments
                sans ordonnance. Il est fourni <strong>à titre d'information uniquement</strong>.
              </p>
              <ul className="list-disc space-y-1.5 pl-5">
                <li>
                  Ce n'est <strong>pas un avis médical</strong> et cela ne remplace ni un médecin, ni un pharmacien, ni un infirmier.
                </li>
                <li>
                  Ce n'est <strong>pas un outil de vérification des interactions</strong>. Lisez toujours la notice
                  complète de chaque produit et demandez l'avis d'un professionnel avant d'associer des médicaments.
                </li>
                <li>
                  Les correspondances avec les situations viennent du texte des notices, pas de recommandations
                  cliniques : elles peuvent être incomplètes ou inclure des produits inattendus.
                </li>
                <li>
                  Suivez toujours les indications du <strong>produit que vous avez réellement</strong> : posologies et
                  mises en garde varient d'un produit à l'autre. Les notices sont celles du marché américain et
                  peuvent différer des médicaments vendus en France.
                </li>
                <li>
                  En cas d'urgence, ou si les symptômes sont graves, s'aggravent ou en cas de doute,{' '}
                  <strong>contactez un professionnel de santé ou appelez le 15 ou le 112</strong>.
                </li>
              </ul>
              <p className="text-xs text-text-muted">
                Données issues d'openFDA (FDA américaine, domaine public). NOMAD n'est ni affilié à la FDA ni approuvé par elle.
              </p>
            </div>

            <div className="mt-6">
              <StyledButton variant="action" fullWidth onClick={acknowledge}>
                J'ai compris — continuer
              </StyledButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
