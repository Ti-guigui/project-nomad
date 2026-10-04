import assert from 'node:assert/strict'
import test from 'node:test'
import { pickLatestReleaseVersion } from '../../app/utils/version.js'

test('ignore les releases dont le tag n’est pas une version (ex. cartes-fr)', () => {
  assert.equal(pickLatestReleaseVersion([{ tag_name: 'cartes-fr' }]), null)
  assert.equal(
    pickLatestReleaseVersion([{ tag_name: 'cartes-fr' }, { tag_name: 'v1.35.0' }]),
    '1.35.0'
  )
})

test('retient la version la plus récente, quel que soit l’ordre', () => {
  assert.equal(
    pickLatestReleaseVersion([
      { tag_name: 'v1.35.0' },
      { tag_name: 'v1.36.1' },
      { tag_name: '1.36.0' },
    ]),
    '1.36.1'
  )
})

test('écarte les brouillons, et les préversions sauf en accès anticipé', () => {
  const releases = [
    { tag_name: 'v1.35.0' },
    { tag_name: 'v1.37.0', draft: true },
    { tag_name: 'v1.36.0-rc.1', prerelease: true },
  ]
  assert.equal(pickLatestReleaseVersion(releases), '1.35.0')
  assert.equal(pickLatestReleaseVersion(releases, true), '1.36.0-rc.1')
})
