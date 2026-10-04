<div align="center">
<img src="admin/public/nomad-primary.svg" width="200" alt="Project NOMAD"/>

# Project NOMAD — version française
### Le savoir qui ne tombe jamais hors ligne

[![Site officiel](https://img.shields.io/badge/Site-projectnomad.us-blue)](https://www.projectnomad.us)
[![Projet d'origine](https://img.shields.io/badge/Projet%20d'origine-Crosstalk--Solutions-lightgrey)](https://github.com/Crosstalk-Solutions/project-nomad)

</div>

---

> **À propos de ce dépôt.** Il s'agit d'une copie (fork) de [Project NOMAD](https://github.com/Crosstalk-Solutions/project-nomad), traduite en français et adaptée à la **France métropolitaine et aux territoires d'outre-mer** :
> - interface et documentation en français ;
> - Wikipédia en français et bibliothèques francophones (Wikivoyage, Wiktionnaire, Vikidia, Wikilivres, WikiMed, iFixit, Gutenberg…) ;
> - nouvelle catégorie de contenus **« France & Outre-mer »** ;
> - cartes hors ligne des **13 régions de métropole** et des **12 territoires d'outre-mer** (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte, Saint-Pierre-et-Miquelon, Saint-Martin, Saint-Barthélemy, Nouvelle-Calédonie, Polynésie française, Wallis-et-Futuna, TAAF) ;
> - sélecteur de pays avec la France découpée en métropole + chaque DROM.
>
> Toutes les ressources restent celles de leurs auteurs respectifs (Kiwix, Wikimédia, OpenStreetMap/Protomaps…). Voir [Mise en place du fork](#mise-en-place-du-fork) pour la publication de l'image Docker et des cartes.

Project NOMAD est un serveur de savoir et d'éducation autonome, conçu pour fonctionner hors ligne, qui regroupe des outils, des connaissances essentielles et de l'IA pour vous garder informé et autonome — n'importe quand, n'importe où.

## Installation et démarrage rapide
Project NOMAD s'installe sur tout système d'exploitation basé sur Debian (Ubuntu 26.04 LTS recommandé ; Ubuntu 24.04 LTS et Debian 12 sont aussi pris en charge). L'installation se fait entièrement en ligne de commande, et tous les outils et ressources s'utilisent depuis un navigateur : pas besoin d'environnement de bureau si vous préférez faire de NOMAD un « serveur » et y accéder depuis d'autres appareils.

**Avant de commencer :** NOMAD lui-même n'a besoin que d'environ **5 Go de disque et de moins de 1 Go de RAM**. Ce sont les contenus hors ligne ajoutés ensuite qui remplissent le disque, et l'assistant IA qui fait grimper les besoins en mémoire. Voir [Configuration requise](#configuration-requise).

*Remarque : les droits sudo/root sont nécessaires pour lancer le script d'installation.*

### Installation rapide (systèmes Debian uniquement)
```bash
sudo apt-get update && \
sudo apt-get install -y curl && \
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/install_nomad.sh \
  -o install_nomad.sh && \
sudo bash install_nomad.sh
```

Project NOMAD est maintenant installé ! Ouvrez un navigateur à l'adresse `http://localhost:8080` (ou `http://IP_DE_L_APPAREIL:8080`) et commencez l'exploration.

Pour un pas-à-pas complet (y compris l'installation d'Ubuntu), voir le [guide d'installation officiel](https://www.projectnomad.us/install) (en anglais). Pour Windows, voir le [guide WSL2](https://www.projectnomad.us/install/wsl2).

### Installation avancée
Pour mieux contrôler l'installation, copiez le [modèle Docker Compose](install/management_compose.yaml) dans un fichier `docker-compose.yml` et personnalisez-le (pensez à remplacer les valeurs d'exemple par les vôtres). Lancez ensuite `docker compose up -d` pour démarrer le Centre de commande et ses dépendances. Cette méthode est réservée aux utilisateurs avancés : elle demande de connaître Docker et de configurer les choses à la main.

## Fonctionnement
NOMAD est une interface de gestion (le « Centre de commande ») et une API qui orchestrent un ensemble d'outils et de ressources conteneurisés via [Docker](https://www.docker.com/). Il gère l'installation, la configuration et les mises à jour de tout — pour que vous n'ayez pas à le faire.

**Fonctionnalités intégrées :**
- **Assistant IA avec base de connaissances** — discussion avec une IA locale propulsée par [Ollama](https://ollama.com/), ou par un logiciel compatible avec l'API OpenAI comme LM Studio ou llama.cpp, avec import de documents et recherche sémantique (RAG via [Qdrant](https://qdrant.tech/))
- **Bibliothèque d'information** — Wikipédia hors ligne, références médicales, livres numériques et plus encore via [Kiwix](https://kiwix.org/)
- **Plateforme éducative** — cours Khan Academy avec suivi de progression via [Kolibri](https://learningequality.org/kolibri/)
- **Cartes hors ligne** — cartes régionales téléchargeables via [ProtoMaps](https://protomaps.com)
- **Outils de données** — chiffrement, encodage et analyse via [CyberChef](https://gchq.github.io/CyberChef/)
- **Notes** — prise de notes locale via [FlatNotes](https://github.com/dullage/flatnotes)
- **Banc d'essai système** — score matériel avec un [classement communautaire](https://benchmark.projectnomad.us)
- **Dépôt d'applications** — un catalogue d'applications en un clic (outils PDF, explorateur de fichiers, bibliothèque de livres numériques, gestionnaire de mots de passe…) et la possibilité de lancer vos propres conteneurs Docker
- **Mises à jour automatiques** — mises à jour du logiciel, des applications et des contenus, sur un créneau que vous choisissez
- **Assistant de configuration** — première configuration guidée avec des collections de contenus sélectionnées

NOMAD comprend aussi un sélecteur de contenu Wikipédia, un gestionnaire de bibliothèque ZIM et un explorateur de contenus.

## Contenu

| Fonction | Propulsé par | Ce que vous obtenez |
|-----------|-----------|-------------|
| Bibliothèque d'information | Kiwix | Wikipédia hors ligne, références médicales, guides de survie, livres numériques |
| Assistant IA | Ollama + Qdrant | Discussion avec import de documents et recherche sémantique |
| Plateforme éducative | Kolibri | Cours Khan Academy, suivi de progression, multi-utilisateurs |
| Cartes hors ligne | ProtoMaps | Cartes régionales téléchargeables, consultables hors ligne |
| Outils de données | CyberChef | Chiffrement, encodage, hachage et analyse de données |
| Notes | FlatNotes | Prise de notes locale au format Markdown |
| Banc d'essai | Intégré | Score matériel, badges et classement communautaire |
| Dépôt d'applications | Intégré | Catalogue d'applications en un clic + vos propres conteneurs Docker |

### Contenus français et outre-mer de cette version

| Catégorie | Exemples de contenus |
|-----------|----------------------|
| France & Outre-mer | Wikivoyage (guides de toutes les régions et de l'outre-mer), géographie et histoire par Wikipédia, Wikisource |
| Médecine & Secours | WikiMed (encyclopédie médicale de Wikipédia en français), C'est pas sorcier – Médecine |
| Éducation & Référence | Vikidia, Wikilivres, Wikiversité, Wiktionnaire, Les Fondamentaux (Canopé), PhET |
| Bibliothèque & Littérature | Wikiquote, livres audio, Bouquineux, Projet Gutenberg en français |
| Bricolage & Réparation | iFixit en français |
| Agriculture & Alimentation | Cuisine libre, C'est pas sorcier – Botanique |
| Informatique | Documentation ubuntu-fr, Informatique par Wikipédia |
| Cartes | 13 régions de métropole, Antilles & Guyane, océan Indien, Pacifique |

Quand aucune ressource française équivalente n'existe, les ressources anglaises d'origine sont conservées et signalées par « (anglais) ».

## Configuration requise
Contrairement à beaucoup d'ordinateurs de survie hors ligne pensés pour du matériel minimaliste, Project NOMAD vise plutôt l'inverse. Pour installer et utiliser les outils d'IA, nous recommandons vivement une machine puissante, avec carte graphique.

Le cœur de NOMAD reste néanmoins très léger. Pour une installation minimale de l'application de gestion seule, voici la configuration requise :

*Remarque : Project NOMAD n'est sponsorisé par aucun fabricant de matériel et se veut aussi indépendant du matériel que possible. Le matériel cité ci-dessous n'est donné qu'à titre d'exemple.*

#### Configuration minimale
- Processeur : double cœur 2 GHz ou mieux
- RAM : 4 Go (l'ensemble sans IA tourne avec moins de 1 Go)
- Stockage : au moins 5 Go libres (prévoir 10 Go pour être à l'aise)
- Système : basé sur Debian (Ubuntu 26.04 LTS recommandé)
- Connexion internet stable (uniquement pendant l'installation)

L'ajout de l'assistant IA porte l'installation à environ **25 Go**, car Ollama et un modèle généraliste sont volumineux, et un modèle a besoin d'à peu près sa taille de téléchargement en mémoire pour répondre. Cette mémoire est prise sur la VRAM si vous avez une carte graphique dédiée, sinon sur la RAM : c'est la principale raison pour laquelle les chiffres ci-dessous sont bien plus élevés.

Pour faire tourner les LLM et les autres outils d'IA :

#### Configuration optimale
- Processeur : AMD Ryzen 7 ou Intel Core i7 ou mieux
- RAM : 32 Go
- Carte graphique : NVIDIA RTX 3060 ou équivalent AMD ou mieux (plus de VRAM = modèles plus gros)
- Stockage : au moins 250 Go libres (de préférence sur SSD)
- Système : basé sur Debian (Ubuntu 26.04 LTS recommandé)
- Connexion internet stable (uniquement pendant l'installation)

**Pour des recommandations de montage détaillées à trois niveaux de prix, voir le [guide matériel](https://www.projectnomad.us/hardware) (en anglais).**

Encore une fois, Project NOMAD lui-même est léger : ce sont les outils et ressources que vous choisissez d'installer qui déterminent la configuration nécessaire.

#### Faire tourner les modèles d'IA sur une autre machine
Par défaut, l'installateur de NOMAD essaie d'installer Ollama sur la machine hôte lors de l'installation de l'assistant IA. Si vous préférez faire tourner le modèle sur une autre machine, ouvrez les paramètres de l'assistant IA et indiquez l'URL d'un serveur Ollama ou d'un serveur compatible avec l'API OpenAI (comme LM Studio).
Si vous utilisez Ollama sur une autre machine, le serveur doit être lancé avec l'option `OLLAMA_HOST=0.0.0.0`.
Ollama reste la méthode recommandée, car il permet notamment de télécharger des modèles, ce que l'API OpenAI ne permet pas : avec LM Studio, par exemple, il faut télécharger les modèles depuis LM Studio.
La mise en place du serveur Ollama/OpenAI sur l'autre machine est de votre ressort.

## Foire aux questions (FAQ)
Pour les questions fréquentes, consultez la [FAQ](FAQ.md).

## Utilisation d'internet et vie privée
Project NOMAD est conçu pour une utilisation hors ligne. Une connexion internet n'est nécessaire que pendant l'installation initiale (pour télécharger les dépendances) et si vous décidez de télécharger des outils et ressources supplémentaires par la suite. Sinon, NOMAD n'a pas besoin d'internet et ne contient AUCUNE télémétrie.

Pour tester la connexion, NOMAD interroge d'abord le point d'accès utilitaire de Cloudflare, `https://1.1.1.1/cdn-cgi/trace`. S'il est injoignable (par exemple parce que votre réseau bloque `1.1.1.1`), il se rabat sur d'autres adresses que l'application contacte déjà (l'API GitHub et l'API de Project NOMAD) et considère la connexion active si l'une d'elles répond.

Vous pouvez changer l'adresse utilisée de deux façons : dans l'interface, sous **Paramètres → Avancé** (enregistré localement sur votre instance), ou avec la variable d'environnement `INTERNET_STATUS_TEST_URL`. La variable d'environnement est toujours prioritaire. Si aucune n'est définie, les valeurs par défaut ci-dessus sont utilisées.

## Sécurité
Project NOMAD est volontairement ouvert et accessible sans obstacle : il n'intègre aucune authentification. Si vous connectez l'appareil à un réseau local après l'installation (par exemple pour que d'autres appareils accèdent à ses ressources), vous pouvez ouvrir ou bloquer des ports pour choisir les services exposés.

Nous recommandons d'utiliser des contrôles au niveau du réseau pour gérer les accès si vous exposez NOMAD à d'autres appareils sur un réseau local. NOMAD n'est pas conçu pour être exposé directement sur internet, et nous le déconseillons fortement, sauf si vous savez vraiment ce que vous faites, avez pris les mesures de sécurité adaptées et comprenez les risques.

## Mise en place du fork

Ce dépôt est autonome : les catalogues de contenus, l'image Docker et les cartes sont lus depuis **ce** dépôt (`Ti-guigui/project-nomad`) et non depuis le projet d'origine. Trois actions sont à faire une fois, dans l'onglet **Actions** de GitHub :

1. **Construire l'image Docker en français** — le workflow « Construire l'image Docker (version française) » se lance tout seul à chaque modification de `admin/` sur `main` (ou manuellement). Il publie `ghcr.io/ti-guigui/project-nomad:latest`.
   Ensuite, dans **Packages → project-nomad → Package settings**, passez la visibilité du paquet en **Public**, sinon les installations ne pourront pas le télécharger.
2. **Générer les cartes France et outre-mer** — lancez le workflow « Générer les cartes France et outre-mer » avec la version indiquée dans `collections/maps.json` (`2026-10`). Il extrait les 25 cartes depuis Protomaps et les publie dans la release `cartes-fr`. Détails dans [cartes-fr/README.md](cartes-fr/README.md).
3. **Mettre à jour depuis le projet d'origine** (facultatif) — le bouton **Sync fork** de GitHub récupère les nouveautés de Crosstalk-Solutions. Attention : les fichiers traduits entreront souvent en conflit ; il faudra les fusionner à la main.

Les mises à jour automatiques intégrées au Centre de commande vérifient les releases de ce fork : tant qu'aucune release n'y est publiée, aucune mise à jour automatique n'est proposée. Pour mettre à jour, utilisez le script `update_nomad.sh` ci-dessous, qui récupère la dernière image `latest`.

## Contribuer
Les contributions au projet d'origine se font sur [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) ; voir [CONTRIBUTING.md](CONTRIBUTING.md) (en anglais).

### Tester les mises à jour automatiques (simulation)

Le Centre de commande peut installer automatiquement ses propres mises à jour **mineures/correctives** pendant un créneau configurable, après un délai de carence, et seulement si les vérifications préalables passent (espace disque suffisant pour la nouvelle image, aucun téléchargement ni installation d'application en cours). Les versions majeures demandent toujours une mise à jour manuelle.

Comme tester cette logique avec de vraies montées de version n'est pas pratique, une commande Ace exécute **toute la chaîne de décision sans jamais déclencher de mise à jour**. Lancez-la depuis le dossier `admin/` :

```bash
# 1) Suite de scénarios déterministes — sans réseau, base de données ni Docker.
#    Couvre chaque cas (majeure seule, carence, préversion/brouillon, créneau à cheval…)
#    et renvoie un code d'erreur en cas d'échec : utilisable en intégration continue.
node ace auto-update:dry-run --scenarios

# 2) Simuler « que se passerait-il si je tournais en 1.32.0 maintenant ? »
#    avec le flux de releases GitHub réel et les vraies vérifications préalables :
node ace auto-update:dry-run --current=1.32.0 --force-enabled

# 3) Simulation entièrement hors ligne avec une liste de releases et une horloge fixées :
node ace auto-update:dry-run --current=1.32.0 --force-enabled \
  --releases-file=./fixtures/releases.json --now=2026-06-04T21:00:00Z \
  --window-start=20:00 --window-end=23:00 --cooloff=72 --skip-preflight
```

La commande affiche la décision — version actuelle, présence dans le créneau, version cible éligible et éventuels blocages — avec un verdict clair comme `WOULD UPDATE → v1.33.2` ou `WOULD NOT UPDATE (outside-window): …`. **Aucune mise à jour réelle n'est jamais demandée.**

| Option | Description |
|------|-------------|
| `--scenarios` | Lance la suite de scénarios intégrée puis s'arrête |
| `--current=<version>` | Simule cette version en cours (ex. `1.32.0`) |
| `--force-enabled` | Considère la mise à jour automatique comme activée, quel que soit le réglage |
| `--cooloff=<heures>` | Remplace le délai de carence |
| `--window-start=<HH:MM>` / `--window-end=<HH:MM>` | Remplace le créneau de mise à jour |
| `--now=<horodatage ISO>` | Simule l'horloge à un instant donné |
| `--releases-file=<chemin>` | Utilise un fichier JSON local de releases au lieu de GitHub (hors ligne) |
| `--skip-preflight` | Ignore les vérifications Docker/disque/file d'attente |

## Communauté et ressources

- **Site officiel :** [www.projectnomad.us](https://www.projectnomad.us) (en anglais)
- **Discord :** [Rejoindre la communauté](https://discord.com/invite/crosstalksolutions) (en anglais)
- **Classement des bancs d'essai :** [benchmark.projectnomad.us](https://benchmark.projectnomad.us)
- **FAQ :** [FAQ.md](FAQ.md)
- **Modules communautaires :** [admin/docs/community-add-ons.md](admin/docs/community-add-ons.md)

## Licence

Project NOMAD est distribué sous la [licence Apache 2.0](LICENSE). Cette version française est une œuvre dérivée, distribuée sous la même licence. Les données cartographiques sont © les contributeurs [OpenStreetMap](https://www.openstreetmap.org/copyright) (via [Protomaps](https://protomaps.com)).

## Scripts utilitaires
Une fois installé, Project NOMAD fournit quelques scripts pour dépanner ou faire de la maintenance impossible depuis le Centre de commande. Ils se trouvent tous dans le dossier d'installation, `/opt/project-nomad`.

###

###### Script de démarrage — démarre tous les conteneurs installés
```bash
sudo bash /opt/project-nomad/start_nomad.sh
```
###

###### Script d'arrêt — arrête tous les conteneurs installés
```bash
sudo bash /opt/project-nomad/stop_nomad.sh
```
###

###### Script de mise à jour — récupère les dernières images du Centre de commande et de ses dépendances (ex. mysql) puis recrée les conteneurs. Remarque : il met à jour *uniquement* les conteneurs du Centre de commande, pas les applications installées, qui se mettent à jour depuis l'interface
```bash
sudo bash /opt/project-nomad/update_nomad.sh
```

###### Script de désinstallation — besoin de repartir de zéro ? Ce script s'occupe de tout. Attention : c'est irréversible !
```bash
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/uninstall_nomad.sh -o uninstall_nomad.sh && sudo bash uninstall_nomad.sh
```
