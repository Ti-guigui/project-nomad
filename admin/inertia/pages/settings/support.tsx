import { Head } from '@inertiajs/react'
import { IconExternalLink } from '@tabler/icons-react'
import SettingsLayout from '~/layouts/SettingsLayout'

export default function SupportPage() {
  return (
    <SettingsLayout>
      <Head title="Soutenir le projet | Project NOMAD" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-4">Soutenir le projet</h1>
          <p className="text-text-muted mb-10 text-lg">
            Project NOMAD est 100 % gratuit et libre — sans abonnement, sans contenu payant, sans piège.
            Si vous voulez aider le projet d'origine à continuer, voici quelques façons de le soutenir.
          </p>

          {/* Ko-fi */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Offrir un café à l'équipe</h2>
            <p className="text-text-muted mb-4">
              Chaque contribution aide à financer le développement, les serveurs et de nouveaux packs de
              contenus pour NOMAD. Même un petit don compte.
            </p>
            <a
              href="https://ko-fi.com/crosstalk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF5E5B] hover:bg-[#e54e4b] text-white font-semibold rounded-lg transition-colors"
            >
              Soutenir sur Ko-fi
              <IconExternalLink size={18} />
            </a>
          </section>

          {/* Rogue Support */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-3">Besoin d'aide pour votre réseau domestique ?</h2>
            <a
              href="https://rogue.support"
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-4 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img
                src="/rogue-support-banner.webp"
                alt="Rogue Support — Conquer Your Home Network"
                className="w-full"
              />
            </a>
            <p className="text-text-muted mb-4">
              Rogue Support est un service de conseil en réseau pour les particuliers (en anglais).
              Un peu comme un Uber du réseau informatique — l'aide d'un expert quand vous en avez besoin.
            </p>
            <a
              href="https://rogue.support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline font-medium"
            >
              Visiter Rogue.Support
              <IconExternalLink size={16} />
            </a>
          </section>

          {/* Other Ways to Help */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">Autres façons d'aider</h2>
            <ul className="space-y-2 text-text-muted">
              <li>
                <a
                  href="https://github.com/Crosstalk-Solutions/project-nomad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Mettre une étoile au projet sur GitHub
                </a>
                {' '}— cela aide d'autres personnes à découvrir NOMAD
              </li>
              <li>
                <a
                  href="https://github.com/Crosstalk-Solutions/project-nomad/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Signaler des bogues et proposer des fonctions
                </a>
                {' '}— chaque signalement améliore NOMAD
              </li>
              <li>Parlez de NOMAD à ceux que ça pourrait intéresser — le bouche-à-oreille reste la meilleure publicité</li>
              <li>
                <a
                  href="https://discord.com/invite/crosstalksolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Rejoindre la communauté Discord
                </a>
                {' '}— discuter, partager votre installation, aider d'autres utilisateurs (en anglais)
              </li>
            </ul>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
