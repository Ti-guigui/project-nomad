import assert from 'node:assert/strict'
import test from 'node:test'
import { visionAttachmentGuidance } from '../../inertia/lib/vision_guidance.js'

test('vision guidance makes temporary image handling explicit', () => {
  const guidance = visionAttachmentGuidance('supported')

  assert.match(guidance, /uniquement avec cette requête/i)
  assert.match(guidance, /pas enregistrées/i)
  assert.match(guidance, /rechargement/i)
})

test('unknown vision guidance explains the user choice without backend jargon', () => {
  const guidance = visionAttachmentGuidance('unknown')

  assert.match(guidance, /ne peut pas confirmer/i)
  assert.match(guidance, /essayer/i)
  assert.match(guidance, /requête échouera/i)
  assert.doesNotMatch(guidance, /backend|metadata|projector/i)
})

test('unsupported vision guidance points users to a compatible model', () => {
  assert.match(visionAttachmentGuidance('unsupported'), /accepte les images/i)
})
