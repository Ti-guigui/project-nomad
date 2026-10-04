/**
 * Version française : traduction à l'affichage des messages produits par le serveur
 * (raisons des mises à jour automatiques, résumés d'exécution…).
 *
 * Le serveur continue d'écrire ses messages en anglais : ils sont vérifiés par les
 * tests et partagés avec le projet d'origine. On les traduit ici, au dernier moment,
 * avec une table de motifs. Un message inconnu est renvoyé tel quel.
 */

type Regle = [RegExp, string | ((...groupes: string[]) => string)]

const REGLES: Regle[] = [
  [/^Up to date$/i, 'À jour'],
  [/^Auto-update disabled after repeated failures$/i, 'Mise à jour automatique désactivée après plusieurs échecs'],
  [
    /^(Content auto-update|Auto-update) disabled after (\d+) consecutive failures\.?\s*(?:Last error: )?(.*)$/is,
    (_, quoi, n, erreur) =>
      `${quoi.startsWith('Content') ? 'Mise à jour automatique des contenus' : 'Mise à jour automatique'} désactivée après ${n} échecs consécutifs.` +
      (erreur ? ` Dernière erreur : ${traduireMessageServeur(erreur)}` : ''),
  ],
  [/^Pinned to :latest — cannot version-check$/i, 'Épinglée sur :latest — impossible de suivre les versions'],
  [/^Major version — manual update required$/i, 'Version majeure — mise à jour manuelle requise'],
  [/^Cool-off pending$/i, 'Délai de carence en attente'],
  [/^In cool-off \((\d+)h remaining\)$/i, (_, h) => `En période de carence (encore ${h} h)`],
  [/^Eligible → (.+)$/, (_, v) => `Éligible → ${v}`],
  [/^(\d+) download\(s\) in progress$/i, (_, n) => `${n} téléchargement(s) en cours`],
  [/^(\d+) app install\/update\(s\) in progress$/i, (_, n) => `${n} installation(s) ou mise(s) à jour d'application en cours`],
  [/^App has an operation in progress \(status: (.+)\)$/i, (_, s) => `Une opération est en cours sur l'application (état : ${s})`],
  [/^App auto-update is disabled$/i, 'La mise à jour automatique des applications est désactivée'],
  [/^Content auto-update is disabled$/i, 'La mise à jour automatique des contenus est désactivée'],
  [/^Auto-update is disabled$/i, 'La mise à jour automatique est désactivée'],
  [/^Outside update window \((.+)\)$/i, (_, f) => `Hors du créneau de mise à jour (${f})`],
  [/^No eligible app updates \(all current, in cool-off, or major-only\)$/i, "Aucune mise à jour d'application éligible (toutes à jour, en période de carence ou versions majeures uniquement)"],
  [/^No eligible content updates$/i, 'Aucune mise à jour de contenu éligible'],
  [/^No eligible minor\/patch update available \(or still in cool-off\)$/i, 'Aucune mise à jour mineure ou corrective éligible (ou encore en période de carence)'],
  [/^Failed to determine eligible version: (.+)$/i, (_, e) => `Impossible de déterminer la version éligible : ${e}`],
  [/^Pre-flight blocked: (.+)$/i, (_, liste) => `Bloqué par les vérifications préalables : ${liste.split('; ').map(traduireMessageServeur).join(' ; ')}`],
  [/^Ready to update to (.+)$/i, (_, v) => `Prêt à mettre à jour vers ${v}`],
  [/^Update requested: (.+)$/i, (_, v) => `Mise à jour demandée : ${v}`],
  [/^Update sidecar is not available$/i, "Le service de mise à jour (sidecar) n'est pas disponible"],
  [/^A system update is already in progress \(stage: (.+)\)$/i, (_, e) => `Une mise à jour du système est déjà en cours (étape : ${e})`],
  [/^(\d+) updated, (\d+) failed, (\d+) skipped$/i, (_, a, b, c) => `${a} mise(s) à jour, ${b} échec(s), ${c} ignorée(s)`],
  [/^Failed: (.+)$/is, (_, e) => `Échec : ${e}`],
  [/^drug dataset: (.+)$/is, (_, r) => `référentiel des médicaments : ${traduireMessageServeur(r)}`],
  [/^drug dataset check failed: (.+)$/is, (_, e) => `échec de la vérification du référentiel des médicaments : ${e}`],
]

// Résumé d'une exécution de mise à jour des contenus : « 2 started, 1 failed, … ».
const MORCEAUX_RESUME: Regle[] = [
  [/^(\d+) started$/i, (_, n) => `${n} lancée(s)`],
  [/^(\d+) failed$/i, (_, n) => `${n} échec(s)`],
  [/^(\d+) skipped \(exceeds cap\)$/i, (_, n) => `${n} ignorée(s) (dépasse le plafond)`],
  [/^(\d+) deferred \(over budget\)$/i, (_, n) => `${n} reportée(s) (budget dépassé)`],
]

function appliquer(regles: Regle[], message: string): string | null {
  for (const [motif, remplacement] of regles) {
    const resultat = message.match(motif)
    if (resultat) {
      return typeof remplacement === 'string' ? remplacement : remplacement(...resultat)
    }
  }
  return null
}

/** Traduit un message du serveur s'il est connu ; sinon le renvoie tel quel. */
export function traduireMessageServeur(message: string | null | undefined): string {
  if (!message) return message ?? ''
  const texte = message.trim()
  const traduit = appliquer(REGLES, texte)
  if (traduit !== null) return traduit

  const morceaux = texte.split(', ')
  const morceauxTraduits = morceaux.map((m) => appliquer(MORCEAUX_RESUME, m))
  if (morceauxTraduits.every((m) => m !== null)) return morceauxTraduits.join(', ')

  return message
}
