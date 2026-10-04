# Premiers pas avec NOMAD

Ce guide vous aide à tirer le meilleur parti de votre serveur NOMAD.

---

## Configuration requise

Si NOMAD tourne déjà, vous pouvez passer cette section. Elle sert quand vous préparez un deuxième serveur, changez de matériel ou aidez quelqu'un à s'installer.

### Système d'exploitation

NOMAD fonctionne sous Linux basé sur Debian.

| Niveau de prise en charge | Système d'exploitation |
|---|---|
| **Recommandé** | Ubuntu 26.04 LTS |
| **Également pris en charge** | Ubuntu 24.04 LTS, Debian 12 |
| **Pris en charge par la communauté** | Windows via WSL2, autres dérivés de Debian |

Ubuntu 26.04 LTS est la version testée et recommandée pour les nouvelles installations. Si vous êtes déjà sous 24.04 LTS ou Debian 12, inutile de réinstaller : les deux restent pris en charge.

Ubuntu Desktop est le choix le plus simple si vous venez de Windows ou macOS. Ubuntu Server fonctionne tout aussi bien si vous êtes à l'aise avec le terminal ; dans les deux cas, NOMAD n'a pas besoin d'environnement de bureau puisque tout passe par le navigateur.

macOS et les distributions non Debian comme Fedora ou Arch ne sont pas officiellement pris en charge.

### Matériel

NOMAD lui-même est léger. Ce qui détermine vos besoins, ce sont les contenus et outils que vous installez, et le fait de faire tourner une IA en local ou non.

**Minimum, sans IA locale :**

- Processeur double cœur 2 GHz
- 4 Go de RAM
- 5 Go d'espace disque libre, plus la place pour les contenus téléchargés

**Recommandé, avec IA locale :**

- AMD Ryzen 7 ou Intel Core i7 ou mieux
- 32 Go de RAM
- NVIDIA RTX 3060 ou équivalent AMD ; plus de VRAM permet des modèles plus gros
- 250 Go d'espace disque libre ou plus, de préférence sur SSD

Une connexion internet stable n'est nécessaire que pendant l'installation. Ensuite, NOMAD est conçu pour fonctionner entièrement hors ligne.

### À propos des pilotes de carte graphique

L'installateur configure Docker et le NVIDIA Container Toolkit pour vous, mais **n'installe pas** le pilote de la carte graphique. Il doit être présent sur la machine au préalable.

Sous Ubuntu, le plus simple est de cocher **« Installer des logiciels tiers pour le matériel graphique et Wi-Fi »** pendant l'installation. Si vous ne l'avez pas fait, ou si vous avez ajouté la carte graphique plus tard, installez d'abord le pilote puis utilisez **Forcer la réinstallation** sur l'assistant IA dans le [Dépôt d'applications](/supply-depot).

Sans carte graphique, l'assistant IA fonctionne quand même, mais sur le processeur, ce qui est nettement plus lent.

---

## Assistant de configuration

Si c'est votre première utilisation de NOMAD, l'assistant de configuration vous aide à tout paramétrer.

**[Lancer l'assistant de configuration →](/easy-setup)**

![Assistant de configuration — étape 1 : choisir les fonctions](/docs/easy-setup-step1.webp)

L'assistant se déroule en quatre étapes simples :
1. **Fonctions** — choisissez ce que vous activez : Bibliothèque d'information, Assistant IA, Plateforme éducative, Cartes, Outils de données et Notes
2. **Cartes** — sélectionnez les régions à garder hors ligne (régions de France métropolitaine, Antilles & Guyane, océan Indien, Pacifique)
3. **Contenus** — choisissez des collections de contenus en niveau Essentiel, Standard ou Complet

![Niveaux de contenu — Essentiel, Standard et Complet](/docs/easy-setup-tiers.webp)
4. **Récapitulatif** — confirmez vos choix et lancez les téléchargements

Selon vos choix, les téléchargements peuvent prendre du temps. Vous pouvez suivre leur avancement dans les Paramètres, continuer à utiliser ce qui est déjà installé, ou laisser le serveur tourner la nuit pour les gros téléchargements.

---

## Comprendre vos outils

### Bibliothèque d'information — le savoir hors ligne (Kiwix)

La Bibliothèque d'information stocke des versions compressées de sites web et d'ouvrages de référence consultables sans internet.

**Ce qu'elle contient :**
- Wikipédia en français (des millions d'articles)
- Références médicales et guides de premiers secours
- Guides pratiques et informations de survie
- Classiques de la littérature (Projet Gutenberg, Wikisource)

**Comment l'utiliser :**
1. Cliquez sur **Bibliothèque d'information** depuis l'écran d'accueil du Centre de commande ou le [Dépôt d'applications](/supply-depot)
2. Choisissez une collection (Wikipédia par exemple)
3. Cherchez ou naviguez comme sur le site habituel

---

### Plateforme éducative — des cours hors ligne (Kolibri)

La Plateforme éducative propose des cours complets utilisables hors ligne.

**Ce qu'elle contient :**
- Cours vidéo Khan Academy
- Mathématiques, sciences, lecture et plus
- Suivi de progression des élèves
- Adaptée à tous les âges

**Comment l'utiliser :**
1. Cliquez sur **Plateforme éducative** depuis l'écran d'accueil ou le [Dépôt d'applications](/supply-depot)
2. Connectez-vous ou créez un compte élève
3. Parcourez les cours et commencez à apprendre

**Astuce :** Kolibri gère plusieurs utilisateurs. Créez un compte par membre de la famille pour suivre la progression de chacun. Kolibri propose aussi des chaînes en français dans son catalogue de contenus.

---

### Assistant IA — la discussion intégrée

![Interface de l'assistant IA](/docs/ai-chat.webp)

NOMAD intègre une interface de discussion avec une IA, propulsée par Ollama. Elle tourne entièrement sur votre serveur : pas besoin d'internet, aucune donnée envoyée ailleurs.

**Ce qu'elle sait faire :**
- Répondre à des questions sur tous les sujets
- Expliquer simplement des notions complexes
- Aider à écrire et à corriger
- S'appuyer sur vos documents via la base de connaissances
- Chercher des idées et aider à résoudre des problèmes

**Comment l'utiliser :**
1. Cliquez sur **Assistant IA** depuis le Centre de commande ou allez sur [Discussion](/chat)
2. Tapez votre question ou votre demande
3. L'IA répond sur le ton de la conversation

**Astuce :** soyez précis. Au lieu de « parle-moi des plantes », essayez « quels légumes poussent bien à l'ombre ? ». Pour des réponses de qualité en français, choisissez un modèle multilingue.

**Remarque :** l'assistant IA doit d'abord être installé. Activez-le dans l'assistant de configuration ou installez-le depuis le [Dépôt d'applications](/supply-depot).

**Accélération graphique :** si votre serveur a une carte graphique NVIDIA, l'installateur de NOMAD configure sa prise en charge (il installe le [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html) et configure Docker automatiquement). Il suffit que le pilote NVIDIA soit présent sur la machine, ce que vous obtenez sous Ubuntu en activant « Installer des logiciels tiers » pendant l'installation. Avec une carte graphique, les réponses de l'IA sont beaucoup plus rapides (10 à 20 fois). Si vous ajoutez une carte graphique plus tard, allez dans le [Dépôt d'applications](/supply-depot) et utilisez **Forcer la réinstallation** sur l'assistant IA.

---

### Base de connaissances — une IA qui connaît vos documents

![Import de documents dans la base de connaissances](/docs/knowledge-base.webp)

La base de connaissances vous permet d'importer des documents que l'IA consultera pour répondre à vos questions. Elle utilise la recherche sémantique (RAG via Qdrant) pour retrouver les informations utiles dans vos fichiers.

**Types de fichiers pris en charge :**
- PDF, fichiers texte et autres formats de documents
- La documentation de NOMAD est chargée automatiquement à l'installation de l'assistant IA

**Comment l'utiliser :**
1. Allez dans **[Base de connaissances →](/knowledge-base)**
2. Importez vos documents (PDF, fichiers texte, etc.)
3. Les documents sont traités et indexés automatiquement
4. Posez vos questions dans l'assistant IA : il s'appuiera sur vos documents quand c'est pertinent
5. Supprimez les documents dont vous n'avez plus besoin : ils sont retirés de l'index et du stockage local

**Exemples d'usage :**
- Importer les plans d'urgence (PCS, DICRIM de votre commune, plan familial de mise en sûreté) pour les retrouver vite en cas de crise
- Charger des manuels techniques et procédures pour des chantiers hors ligne
- Ajouter des programmes scolaires pour l'instruction en famille
- Stocker des articles de recherche pour le travail universitaire

---

### Cartes — naviguer hors ligne

![Visionneuse de cartes hors ligne](/docs/maps.webp)

Consultez des cartes sans internet. Téléchargez les régions dont vous avez besoin avant de partir.

**Comment les utiliser :**
1. Cliquez sur **Cartes** depuis le Centre de commande
2. Déplacez-vous en glissant et zoomez
3. Cherchez des lieux avec la barre de recherche

**Pour ajouter des régions :**
1. Allez dans **Paramètres → Gestionnaire de cartes**
2. Choisissez une collection (régions de France métropolitaine, Antilles & Guyane, océan Indien, Pacifique), ou utilisez **Choisir des pays** et le groupe « France & Outre-mer » pour extraire un territoire précis
3. Cliquez sur Télécharger

**Astuce :** téléchargez les cartes des zones où vous allez souvent, ainsi que les régions voisines, au cas où.

**[Ouvrir les cartes →](/maps)**

---

## Gérer votre serveur

### Ajouter des contenus

Vos besoins évoluent ? Vous pouvez ajouter des contenus à tout moment :

- **Applications :** Paramètres → Dépôt d'applications
- **Ouvrages de référence :** Paramètres → Explorateur de contenus ou Gestionnaire de contenus
- **Régions de carte :** Paramètres → Gestionnaire de cartes
- **Contenus éducatifs :** via le catalogue intégré de Kolibri

### Sélecteur Wikipédia

![Explorateur de contenus — parcourir et télécharger Wikipédia et les collections](/docs/content-explorer.webp)

NOMAD comprend un outil dédié pour parcourir et télécharger les éditions de Wikipédia.

**Comment l'utiliser :**
1. Allez dans **[Explorateur de contenus →](/settings/zim/remote-explorer)**
2. Parcourez les éditions de Wikipédia disponibles par taille
3. Choisissez et téléchargez celle que vous voulez

**Remarque :** choisir une autre édition de Wikipédia remplace celle téléchargée auparavant. Une seule sélection Wikipédia est active à la fois.

### Banc d'essai système

![Banc d'essai avec score NOMAD et badge de constructeur](/docs/benchmark.webp)

Mesurez les performances de votre matériel et comparez votre machine NOMAD à celles de la communauté.

**Comment l'utiliser :**
1. Allez dans **[Banc d'essai →](/settings/benchmark)**
2. Choisissez un type de test : Complet, Système seul ou IA seule
3. Consultez votre score NOMAD (une moyenne pondérée des performances du processeur, de la mémoire, du disque et de l'IA)
4. Créez votre badge de constructeur (votre identité NOMAD, comme « Tactical-Llama-1234 »)
5. Partagez vos résultats sur le [classement communautaire](https://benchmark.projectnomad.us)

**Remarque :** seuls les bancs d'essai complets avec données d'IA peuvent être partagés sur le classement.

### Rester à jour

Tant que vous avez internet, recherchez régulièrement les mises à jour :

1. Allez dans **Paramètres → Rechercher des mises à jour**
2. Si des mises à jour sont disponibles, cliquez pour les installer
3. Attendez la fin de la mise à jour (le serveur redémarre)

Les mises à jour des contenus (Wikipédia, cartes, etc.) se gèrent séparément de celles du logiciel.

**Mises à jour automatiques :** NOMAD peut aussi se tenir à jour tout seul. Le logiciel, les applications et les contenus peuvent chacun être mis à jour automatiquement si vous l'activez, avec des vérifications de sécurité et un créneau horaire de votre choix. Voir le **[guide des mises à jour](/docs/updates)**.

**Canal d'accès anticipé :** envie des nouveautés avant leur version stable ? Activez le canal d'accès anticipé sur la page Rechercher des mises à jour pour recevoir les versions candidates. Vous pouvez revenir au canal stable à tout moment.

### Surveiller l'état du système

Vérifiez votre serveur à tout moment :

1. Allez dans **Paramètres → Système**
2. Consultez l'utilisation du processeur, de la mémoire et du stockage
3. Vérifiez la durée de fonctionnement et l'état du système

---

## Conseils pour de meilleurs résultats

### Avant de partir hors ligne

- **Mettez tout à jour** — logiciel et contenus
- **Téléchargez ce dont vous avez besoin** — cartes, ouvrages de référence, contenus éducatifs
- **Testez** — vérifiez que tout fonctionne tant que vous avez internet pour dépanner

### Gérer le stockage

L'espace de votre serveur est limité. Privilégiez :
- les contenus que vous utiliserez vraiment ;
- les références essentielles (médecine, survie) ;
- les cartes de votre région ;
- les contenus éducatifs adaptés à vos besoins.

Consultez l'utilisation du stockage dans **Paramètres → Système**.

### Obtenir de l'aide

- **Documentation intégrée :** vous êtes en train de la lire
- **Assistant IA :** posez une question dans l'[assistant IA](/chat)
- **Notes de version :** découvrez les nouveautés de chaque version

---

## Et maintenant ?

Vous êtes prêt à utiliser NOMAD. Quelques idées pour commencer :

1. **Chercher une information** — cherchez un sujet dans la Bibliothèque d'information
2. **Apprendre** — commencez un cours Khan Academy sur la Plateforme éducative
3. **Poser une question** — discutez avec l'IA dans l'[assistant IA](/chat)
4. **Explorer les cartes** — retrouvez votre quartier dans la visionneuse de cartes
5. **Importer un document** — ajoutez un PDF à la [base de connaissances](/knowledge-base) et interrogez l'IA dessus

Bonne découverte de votre serveur de connaissances hors ligne !
