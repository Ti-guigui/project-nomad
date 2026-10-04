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

test("traduit les réponses de l'API, y compris celles avec des valeurs variables", () => {
  assert.equal(traduireMessageServeur('Service nomad_kiwix_server started successfully'), 'Service nomad_kiwix_server démarré')
  assert.equal(
    traduireMessageServeur('Failed to stop service nomad_ollama. Check server logs for details.'),
    "Échec de l'arrêt du service nomad_ollama. Consultez les journaux du serveur."
  )
  assert.equal(
    traduireMessageServeur('Service nomad_ollama not found or not installed'),
    'Service nomad_ollama introuvable ou non installé'
  )
  assert.equal(traduireMessageServeur('Model "llama3.2" deleted.'), 'Modèle « llama3.2 » supprimé.')
  assert.equal(
    traduireMessageServeur('Cleaned up 1 failed job, deleted 2 files.'),
    '1 tâche(s) en échec nettoyée(s), 2 fichier(s) supprimé(s).'
  )
  assert.equal(traduireMessageServeur('Cancelled 3 jobs.'), '3 tâche(s) annulée(s).')
  assert.equal(
    traduireMessageServeur('Update sidecar is not available. Ensure the updater container is running.'),
    "Le service de mise à jour (sidecar) n'est pas disponible. Vérifiez que le conteneur « updater » est démarré."
  )
  assert.equal(traduireMessageServeur('Session not found'), 'Conversation introuvable')
})
