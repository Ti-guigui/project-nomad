import { Head } from '@inertiajs/react'
import SettingsLayout from '~/layouts/SettingsLayout'

export default function LegalPage() {
  return (
    <SettingsLayout>
      <Head title="Mentions légales | Project NOMAD" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6 max-w-4xl">
          <h1 className="text-4xl font-semibold mb-8">Mentions légales</h1>

          {/* License Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Licence</h2>
            <p className="text-text-primary mb-3">Copyright 2024-2026 Crosstalk Solutions, LLC</p>
            <p className="text-text-primary mb-3 italic">
              Le texte de la licence ci-dessous est reproduit dans sa version originale anglaise, qui
              seule fait foi. Cette version française est une œuvre dérivée distribuée sous la même licence.
            </p>
            <p className="text-text-primary mb-3">
              Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
              you may not use this file except in compliance with the License.
              You may obtain a copy of the License at
            </p>
            <p className="text-text-primary mb-3">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.apache.org/licenses/LICENSE-2.0</a>
            </p>
            <p className="text-text-primary">
              Unless required by applicable law or agreed to in writing, software
              distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
              WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
              See the License for the specific language governing permissions and
              limitations under the License.
            </p>
          </section>

          {/* Third-Party Software */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Logiciels tiers</h2>
            <p className="text-text-primary mb-4">
              Project NOMAD&trade; intègre les projets libres suivants. Merci à leurs développeurs et à
              leurs communautés :
            </p>
            <ul className="space-y-3 text-text-primary">
              <li>
                <strong>Kiwix</strong> - Lecteur hors ligne de Wikipédia et d'autres contenus (licence GPL-3.0)
                <br />
                <a href="https://kiwix.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://kiwix.org</a>
              </li>
              <li>
                <strong>Kolibri</strong> - Plateforme d'apprentissage hors ligne de Learning Equality (licence MIT)
                <br />
                <a href="https://learningequality.org/kolibri" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://learningequality.org/kolibri</a>
              </li>
              <li>
                <strong>Ollama</strong> - Moteur d'exécution local de grands modèles de langage (licence MIT)
                <br />
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://ollama.com</a>
              </li>
              <li>
                <strong>CyberChef</strong> - Boîte à outils d'analyse et d'encodage de données du GCHQ (licence Apache 2.0)
                <br />
                <a href="https://github.com/gchq/CyberChef" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/gchq/CyberChef</a>
              </li>
              <li>
                <strong>FlatNotes</strong> - Application de prise de notes auto-hébergée (licence MIT)
                <br />
                <a href="https://github.com/dullage/flatnotes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/dullage/flatnotes</a>
              </li>
              <li>
                <strong>Qdrant</strong> - Moteur de recherche vectorielle pour la base de connaissances de l'IA (licence Apache 2.0)
                <br />
                <a href="https://github.com/qdrant/qdrant" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://github.com/qdrant/qdrant</a>
              </li>
              <li>
                <strong>OpenStreetMap</strong> - Données cartographiques © les contributeurs OpenStreetMap (licence ODbL), mises en forme par Protomaps
                <br />
                <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.openstreetmap.org/copyright</a>
              </li>
              <li>
                <strong>Natural Earth</strong> - Contours des pays et des régions de France (domaine public)
                <br />
                <a href="https://www.naturalearthdata.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.naturalearthdata.com</a>
              </li>
            </ul>
          </section>

          {/* Privacy Statement */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Confidentialité</h2>
            <p className="text-text-primary mb-3">
              Project NOMAD est conçu avec le respect de la vie privée comme principe fondamental :
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li><strong>Aucune télémétrie :</strong> NOMAD ne collecte, ne transmet ni ne stocke aucune donnée d'utilisation, statistique ou télémétrie.</li>
              <li><strong>Local d'abord :</strong> toutes vos données, contenus téléchargés, conversations avec l'IA et notes restent sur votre appareil.</li>
              <li><strong>Aucun compte nécessaire :</strong> par défaut, NOMAD fonctionne sans compte utilisateur ni authentification.</li>
              <li><strong>Réseau facultatif :</strong> internet n'est nécessaire que pour télécharger des contenus ou des mises à jour. Toutes les fonctions installées marchent entièrement hors ligne.</li>
            </ul>
          </section>

          {/* Content Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Avertissement sur les contenus</h2>
            <p className="text-text-primary mb-3">
              Project NOMAD fournit des outils pour télécharger et consulter des contenus de sources
              tierces : Wikipédia, Wikilivres, références médicales, plateformes éducatives, cartes
              OpenStreetMap et autres ressources publiques.
            </p>
            <p className="text-text-primary mb-3">
              Ni Crosstalk Solutions, LLC ni les auteurs de cette version française ne créent,
              contrôlent, vérifient ou garantissent l'exactitude, l'exhaustivité ou la fiabilité des
              contenus tiers. La présence d'un contenu ne vaut pas approbation.
            </p>
            <p className="text-text-primary">
              Il appartient aux utilisateurs d'évaluer la pertinence et l'exactitude des contenus qu'ils
              téléchargent et utilisent.
            </p>
          </section>

          {/* Medical Disclaimer */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Avertissement sur les informations médicales et d'urgence</h2>
            <p className="text-text-primary mb-3">
              Certains contenus accessibles via NOMAD comprennent des références médicales, des guides
              de premiers secours et des informations de préparation aux urgences. Ils sont fournis à
              titre d'information générale uniquement.
            </p>
            <p className="text-text-primary mb-3 font-semibold">
              Ces informations NE REMPLACENT PAS l'avis, le diagnostic ou le traitement d'un professionnel de santé.
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary mb-3">
              <li>Demandez toujours l'avis de professionnels de santé qualifiés pour toute question médicale.</li>
              <li>N'ignorez jamais un avis médical et ne tardez pas à consulter à cause d'un contenu lu hors ligne.</li>
              <li>En cas d'urgence médicale, appelez immédiatement les secours si possible : 15 (SAMU), 18 (pompiers), 112 (numéro d'urgence européen), 114 (par SMS pour les personnes sourdes ou malentendantes).</li>
              <li>Les informations médicales peuvent devenir obsolètes. Vérifiez les informations essentielles auprès de sources professionnelles à jour quand c'est possible.</li>
            </ul>
          </section>

          {/* Data Storage Notice */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Stockage des données</h2>
            <p className="text-text-primary mb-3">
              Toutes les données de Project NOMAD sont stockées localement sur votre appareil :
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-primary">
              <li><strong>Dossier d'installation :</strong> /opt/project-nomad</li>
              <li><strong>Contenus téléchargés :</strong> /opt/project-nomad/storage</li>
              <li><strong>Données des applications :</strong> stockées dans des volumes Docker sur votre système</li>
            </ul>
            <p className="text-text-primary mt-3">
              Vous gardez le contrôle total de vos données. Désinstaller NOMAD ou supprimer ces dossiers
              efface définitivement toutes les données associées.
            </p>
          </section>

        </main>
      </div>
    </SettingsLayout>
  )
}
