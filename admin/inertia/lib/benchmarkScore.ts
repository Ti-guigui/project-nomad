import type { BenchmarkType } from '../../types/benchmark'

/**
 * How a benchmark result's headline score should be presented. A partial run
 * (System Only / AI Only) is NOT the NOMAD Score -- the NOMAD Score is the full
 * benchmark composite -- so partial results are relabelled and flagged to avoid
 * users mistaking a partial number for their NOMAD Score. The stored score for
 * a partial run is already renormalized to that category's own 0-100 range
 * (see BenchmarkService._calculateNomadScore).
 */
export function getScoreDisplay(type: BenchmarkType): {
  label: string
  isPartial: boolean
  /** Which full benchmark to run to get the real NOMAD Score, for the CTA copy. */
  cta: string
} {
  switch (type) {
    case 'system':
      return {
        label: 'Score système',
        isPartial: true,
        cta: 'Ceci est un résultat partiel, pas votre score NOMAD. Lancez un banc d’essai complet pour obtenir votre score NOMAD.',
      }
    case 'ai':
      return {
        label: 'Score IA',
        isPartial: true,
        cta: 'Ceci est un résultat partiel, pas votre score NOMAD. Lancez un banc d’essai complet pour obtenir votre score NOMAD.',
      }
    default:
      return { label: 'Score NOMAD', isPartial: false, cta: '' }
  }
}
