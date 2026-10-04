import {
  IconAlertTriangle,
  IconAmbulance,
  IconAntenna,
  IconBandage,
  IconBarrel,
  IconBattery,
  IconBed,
  IconBolt,
  IconBuildingHospital,
  IconCampfire,
  IconCar,
  IconDoor,
  IconDroplet,
  IconFirstAidKit,
  IconFish,
  IconFlag,
  IconGasStation,
  IconHome,
  IconMapPinFilled,
  IconMeat,
  IconMountain,
  IconPackage,
  IconPill,
  IconRadio,
  IconRoute,
  IconSeeding,
  IconSkull,
  IconSolarPanel,
  IconStethoscope,
  IconTent,
  IconTool,
  IconToolsKitchen2,
  IconTractor,
  IconTrees,
  IconTruck,
  IconWheat,
  IconWifi,
} from '@tabler/icons-react'
import type { IconProps } from '@tabler/icons-react'
import type { ComponentType } from 'react'

/**
 * The marker icon set: a curated 36, laid out as six rows of six.
 *
 * Deliberately named imports rather than `import * as TablerIcons`. The
 * namespace form pulls the entire icon library into the maps bundle -- when this
 * picker offered all of Tabler *and* all of Font Awesome it took the maps chunk
 * from 864 kB to 5,774 kB, and gave the user 160 pages to scroll through,
 * including brand logos and text-alignment glyphs. Neither is what someone
 * marking a water source needs.
 *
 * Adding an icon means adding it here, which is the point: the list stays
 * meaningful for marking a place on a map you are relying on offline.
 */
export type MarkerIconEntry = {
  /** Stored on the marker row, e.g. `tabler:IconDroplet`. */
  name: string
  /** Shown as the button tooltip. */
  label: string
  Icon: ComponentType<IconProps>
}

const entry = (
  Icon: ComponentType<IconProps>,
  tablerName: string,
  label: string
): MarkerIconEntry => ({ name: `tabler:${tablerName}`, label, Icon })

export const MARKER_ICONS: MarkerIconEntry[] = [
  // Water and food
  entry(IconDroplet, 'IconDroplet', 'Eau'),
  entry(IconBarrel, 'IconBarrel', "Réserve d'eau"),
  entry(IconToolsKitchen2, 'IconToolsKitchen2', 'Nourriture'),
  entry(IconWheat, 'IconWheat', 'Céréales ou cultures'),
  entry(IconMeat, 'IconMeat', 'Viande ou gibier'),
  entry(IconFish, 'IconFish', 'Pêche'),

  // Shelter and living
  entry(IconHome, 'IconHome', 'Bâtiment'),
  entry(IconTent, 'IconTent', 'Campement'),
  entry(IconBed, 'IconBed', 'Abri'),
  entry(IconDoor, 'IconDoor', 'Entrée'),
  entry(IconCampfire, 'IconCampfire', 'Feu'),
  entry(IconSeeding, 'IconSeeding', 'Potager'),

  // Medical
  entry(IconFirstAidKit, 'IconFirstAidKit', 'Premiers secours'),
  entry(IconBuildingHospital, 'IconBuildingHospital', 'Hôpital'),
  entry(IconStethoscope, 'IconStethoscope', 'Cabinet médical'),
  entry(IconPill, 'IconPill', 'Médicaments'),
  entry(IconBandage, 'IconBandage', 'Fournitures'),
  entry(IconAmbulance, 'IconAmbulance', 'Ambulance'),

  // Power and communications
  entry(IconBolt, 'IconBolt', 'Électricité'),
  entry(IconSolarPanel, 'IconSolarPanel', 'Solaire'),
  entry(IconBattery, 'IconBattery', 'Batterie'),
  entry(IconAntenna, 'IconAntenna', 'Antenne'),
  entry(IconRadio, 'IconRadio', 'Radio'),
  entry(IconWifi, 'IconWifi', 'Réseau'),

  // Transport and supply
  entry(IconGasStation, 'IconGasStation', 'Carburant'),
  entry(IconCar, 'IconCar', 'Véhicule'),
  entry(IconTruck, 'IconTruck', 'Camion'),
  entry(IconTractor, 'IconTractor', 'Engins'),
  entry(IconPackage, 'IconPackage', 'Cache ou réserves'),
  entry(IconTool, 'IconTool', 'Outils'),

  // Terrain, routes and hazards
  entry(IconMountain, 'IconMountain', 'Point haut'),
  entry(IconTrees, 'IconTrees', 'Bois'),
  entry(IconRoute, 'IconRoute', 'Itinéraire'),
  entry(IconFlag, 'IconFlag', 'Point de ralliement'),
  entry(IconAlertTriangle, 'IconAlertTriangle', 'Risque'),
  entry(IconSkull, 'IconSkull', 'Danger'),
]

/** The pin used when a marker has no icon, or names one no longer in the set. */
export const DEFAULT_MARKER_ICON = IconMapPinFilled

const BY_NAME = new Map(MARKER_ICONS.map((i) => [i.name, i.Icon]))

/**
 * Resolve a stored icon name to a component, falling back to the default pin.
 *
 * The fallback matters beyond bad data: a marker saved with an icon that is
 * later removed from the set must still render, rather than blanking the pin.
 */
export function resolveMarkerIcon(
  icon?: string | null,
  fallback: ComponentType<IconProps> = DEFAULT_MARKER_ICON
): ComponentType<IconProps> {
  if (!icon) return fallback
  return BY_NAME.get(icon) ?? fallback
}
