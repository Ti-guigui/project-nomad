import assert from 'node:assert/strict'
import test from 'node:test'
import { traduireMessageServeur } from '../../inertia/lib/traduction_serveur.js'

test('traduit les raisons simples des mises à jour automatiques', () => {
  assert.equal(traduireMessageServeur('Up to date'), 'À jour')
  assert.equal(traduireMessageServeur('In cool-off (12h remaining)'), 'En période de carence (encore 12 h)')
  assert.equal(traduireMessageServeur('Eligible → 1.2.3'), 'Éligible → 1.2.3')
  assert.equal(
    traduireMessageServeur('Outside update window (02:00-05:00)'),
    'Hors du créneau de mise à jour (02:00-05:00)'
  )
})

test('traduit les messages composés et garde le détail des erreurs', () => {
  assert.equal(
    traduireMessageServeur('Pre-flight blocked: 2 download(s) in progress; Update sidecar is not available'),
    "Bloqué par les vérifications préalables : 2 téléchargement(s) en cours ; Le service de mise à jour (sidecar) n'est pas disponible"
  )
  assert.equal(
    traduireMessageServeur('Auto-update disabled after 3 consecutive failures. Last error: disk full'),
    'Mise à jour automatique désactivée après 3 échecs consécutifs. Dernière erreur : disk full'
  )
  assert.equal(traduireMessageServeur('2 started, 1 failed'), '2 lancée(s), 1 échec(s)')
})

test('renvoie tel quel un message inconnu, et une chaîne vide pour null', () => {
  assert.equal(traduireMessageServeur('Something unexpected'), 'Something unexpected')
  assert.equal(traduireMessageServeur(null), '')
})
