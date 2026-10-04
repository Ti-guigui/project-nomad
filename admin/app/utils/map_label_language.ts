/**
 * Version française : les styles de base de NOMAD affichent les libellés de carte
 * en anglais (`name:en`). On les remplace par le nom français (`name:fr`) quand
 * OpenStreetMap le connaît, avec repli sur le nom anglais puis le nom local.
 */
export const MAP_LABEL_LANGUAGE = 'fr'

const ENGLISH_NAME = ['get', 'name:en']

function isEnglishNameGetter(value: unknown): boolean {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    value[0] === ENGLISH_NAME[0] &&
    value[1] === ENGLISH_NAME[1]
  )
}

/** Remplace récursivement chaque `["get", "name:en"]` par une expression qui préfère la langue choisie. */
export function localizeLabelExpression(value: unknown, language = MAP_LABEL_LANGUAGE): unknown {
  if (isEnglishNameGetter(value)) {
    return ['coalesce', ['get', `name:${language}`], ['get', 'name:en']]
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeLabelExpression(item, language))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeLabelExpression(item, language)])
    )
  }
  return value
}

/** Applique la langue des libellés au `layout` de chaque couche d'un style MapLibre. */
export function localizeStyleLayers<T extends object>(layers: T[], language = MAP_LABEL_LANGUAGE): T[] {
  return layers.map((layer) => {
    const layout = (layer as { layout?: unknown }).layout
    return layout ? { ...layer, layout: localizeLabelExpression(layout, language) } : layer
  })
}
