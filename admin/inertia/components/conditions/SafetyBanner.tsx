import { IconAlertTriangle } from '@tabler/icons-react'

/**
 * "When to use what" — top-of-page safety banner.
 *
 * A prominent amber callout that renders at the TOP of both the condition index
 * and detail pages: results are FDA label-indication matches, NOT
 * recommendations, NOT an FDA endorsement, and NOT a drug-interaction checker.
 * It leads the page (not a footnote) so the caveat is read before any result.
 */
export default function SafetyBanner() {
  return (
    <div role="alert" className="mb-6 rounded-lg border-2 border-amber-400 bg-amber-50 p-4">
      <div className="flex items-start gap-3">
        <IconAlertTriangle
          size={22}
          className="mt-0.5 flex-shrink-0 text-amber-600"
          aria-hidden="true"
        />
        <div className="text-sm text-amber-900">
          <p className="font-bold mb-1">Référence à titre d'information uniquement — pas un avis médical.</p>
          <ul className="list-disc pl-5 space-y-0.5 text-amber-800">
            <li>
              Ces résultats associent les indications des notices de la FDA à une situation. Ce n'est{' '}
              <strong>pas une recommandation</strong> ni <strong>un avis de la FDA</strong>.
            </li>
            <li>
              Ce n'est <strong>pas un outil de vérification des interactions</strong>. Lisez toutes les
              mises en garde de chaque notice, et demandez l'avis d'un pharmacien ou d'un médecin avant
              d'associer des médicaments.
            </li>
            <li>
              En cas d'urgence, ou si les symptômes sont graves ou s'aggravent,{' '}
              <strong>contactez un professionnel de santé ou appelez le 15 ou le 112</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
