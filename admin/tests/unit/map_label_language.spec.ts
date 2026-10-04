import assert from 'node:assert/strict'
import test from 'node:test'
import { localizeLabelExpression, localizeStyleLayers } from '../../app/utils/map_label_language.js'

test('les libellés anglais préfèrent le nom français, avec repli sur l’anglais', () => {
  assert.deepEqual(localizeLabelExpression(['get', 'name:en']), [
    'coalesce',
    ['get', 'name:fr'],
    ['get', 'name:en'],
  ])
})

test('les expressions imbriquées sont traduites et le reste est inchangé', () => {
  const layout = {
    'text-field': ['format', ['coalesce', ['get', 'name:en'], ['get', 'name']], {}],
    'text-size': 12,
  }
  assert.deepEqual(localizeLabelExpression(layout), {
    'text-field': [
      'format',
      ['coalesce', ['coalesce', ['get', 'name:fr'], ['get', 'name:en']], ['get', 'name']],
      {},
    ],
    'text-size': 12,
  })
})

test('les couches sans layout ne sont pas modifiées', () => {
  const layers = [{ id: 'background', type: 'background' }]
  assert.deepEqual(localizeStyleLayers(layers), layers)
})
