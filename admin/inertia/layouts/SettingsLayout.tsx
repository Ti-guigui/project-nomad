import {
  IconAdjustments,
  IconArrowBigUpLines,
  IconBox,
  IconChartBar,
  IconCode,
  IconDashboard,
  IconFolder,
  IconGavel,
  IconHeart,
  IconMapRoute,
  IconMovie,
  IconSettings,
  IconWand,
  IconZoom
} from '@tabler/icons-react'
import { usePage } from '@inertiajs/react'
import StyledSidebar from '~/components/StyledSidebar'
import { getServiceLink } from '~/lib/navigation'
import useServiceInstalledStatus from '~/hooks/useServiceInstalledStatus'
import useCreatorPacks from '~/hooks/useCreatorPacks'
import { SERVICE_NAMES } from '../../constants/service_names'

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const { aiAssistantName } = usePage<{ aiAssistantName: string }>().props
  const aiAssistantInstallStatus = useServiceInstalledStatus(SERVICE_NAMES.OLLAMA)
  // Only show the Creator Packs entry on builds that can actually install packs
  // (release-injected key present) — a fork built from source has no key.
  const { configured: creatorPacksConfigured } = useCreatorPacks()

  const navigation = [
    ...(aiAssistantInstallStatus.isInstalled ? [{ name: aiAssistantName, href: '/settings/models', icon: IconWand, current: false }] : []),
    { name: "Dépôt d'applications", href: '/supply-depot', icon: IconBox, current: false },
    { name: "Banc d'essai", href: '/settings/benchmark', icon: IconChartBar, current: false },
    { name: 'Explorateur de contenus', href: '/settings/zim/remote-explorer', icon: IconZoom, current: false },
    { name: 'Gestionnaire de contenus', href: '/settings/zim', icon: IconFolder, current: false },
    ...(creatorPacksConfigured ? [{ name: 'Packs de créateurs', href: '/settings/creator-packs', icon: IconMovie, current: false }] : []),
    { name: 'Gestionnaire de cartes', href: '/settings/maps', icon: IconMapRoute, current: false },
    {
      name: 'Journaux et métriques des services',
      href: getServiceLink('9999'),
      icon: IconDashboard,
      current: false,
      target: '_blank',
    },
    {
      name: 'Rechercher des mises à jour',
      href: '/settings/update',
      icon: IconArrowBigUpLines,
      current: false,
    },
    { name: 'Système', href: '/settings/system', icon: IconSettings, current: false },
    { name: 'Avancé', href: '/settings/advanced', icon: IconAdjustments, current: false },
    { name: "Référence de l'API", href: '/reference', icon: IconCode, current: false },
    { name: 'Soutenir le projet', href: '/settings/support', icon: IconHeart, current: false },
    { name: 'Mentions légales', href: '/settings/legal', icon: IconGavel, current: false },
  ]

  return (
    <div className="min-h-screen flex flex-row bg-surface-secondary/90">
      <StyledSidebar title="Paramètres" items={navigation} />
      {children}
    </div>
  )
}
