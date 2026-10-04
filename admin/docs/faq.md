# Foire aux questions

## Questions générales

### Qu'est-ce que NOMAD ?
NOMAD est un serveur personnel qui donne accès au savoir, à l'éducation et à l'aide d'une IA sans connexion internet. Il tourne sur votre propre matériel : vos données restent privées et accessibles à tout moment.

### Faut-il internet pour utiliser NOMAD ?
Non, c'est tout l'intérêt. Une fois vos contenus téléchargés, tout fonctionne hors ligne. Internet ne sert qu'à :
- télécharger de nouveaux contenus ;
- mettre à jour le logiciel ;
- récupérer les dernières versions de Wikipédia, des cartes, etc.

### Quel système d'exploitation faut-il ?
Linux basé sur Debian. **Ubuntu 26.04 LTS est la version recommandée et testée** pour les nouvelles installations.

Ubuntu 24.04 LTS et Debian 12 sont aussi pris en charge : inutile de réinstaller si vous les utilisez déjà. Sous Windows, suivez le [guide WSL2](https://www.projectnomad.us/install/wsl2), soutenu par la communauté.

macOS et les distributions non Debian comme Fedora ou Arch ne sont pas officiellement pris en charge. NOMAD n'a pas besoin d'environnement de bureau : Ubuntu Server convient très bien si vous êtes à l'aise avec le terminal.

Pour un pas-à-pas complet, installation d'Ubuntu comprise, voir le [guide d'installation](https://www.projectnomad.us/install) (en anglais).

### Quel matériel faut-il ?
NOMAD est pensé pour du matériel performant, surtout si vous voulez utiliser l'IA. Recommandé :
- Processeur multicœur récent (un AMD Ryzen 7 avec graphismes Radeon est le meilleur compromis selon la communauté)
- 16 Go de RAM ou plus (32 Go ou plus pour une IA performante)
- Stockage SSD (selon les contenus : 500 Go minimum, 1 To ou plus recommandé)
- Carte graphique NVIDIA ou AMD recommandée pour des réponses d'IA plus rapides

**Pour des recommandations détaillées à trois niveaux de prix, voir le [guide matériel](https://www.projectnomad.us/hardware) (en anglais).**

### Combien de RAM faut-il ?

**Sans l'assistant IA, l'ensemble tient sous 1 Go.** Mesuré sur une installation en fonctionnement : Centre de commande 241 Mo, MySQL 444 Mo, Redis 9 Mo, Kiwix 101 Mo et index de la base de connaissances 155 Mo. C'est pourquoi 4 Go est un vrai minimum, pas une marge de sécurité.

**L'IA est la variable, et c'est le modèle qui compte plus que NOMAD.** Ollama consomme environ 1,2 Go au repos, et un modèle a besoin d'à peu près sa taille de téléchargement en mémoire quand il répond : un modèle 8B d'environ 4,6 Go demande donc à peu près autant en plus. **8 Go suffisent pour un petit modèle, 16 Go sont confortables, et 32 Go sont recommandés pour des modèles plus gros.**

L'origine de cette mémoire dépend du matériel. Avec une carte graphique dédiée, le modèle se charge en VRAM sans toucher à la RAM : c'est alors la VRAM qui limite les modèles utilisables. Avec un circuit graphique intégré ou sans carte graphique, la mémoire est prise sur la RAM, d'où le besoin d'en avoir davantage sur une machine sans carte graphique.

### Combien d'espace disque faut-il ?

**Pour installer NOMAD lui-même : environ 5 Go, prévoyez donc 10 Go libres.** Cela couvre le Centre de commande et sa base de données, sans contenus. L'ajout de l'assistant IA porte le total à environ 25 Go, car Ollama et un modèle généraliste sont volumineux.

Ensuite, tout dépend de ce que vous téléchargez :
- Wikipédia en français complète : environ 3,5 Go (compacte), 12 Go (sans images) ou 52 Go (intégrale)
- Cours Khan Academy : environ 50 Go
- Références médicales : 300 Mo à 1,5 Go
- Cartes : de 1 à 35 Mo par territoire d'outre-mer, de 50 à 950 Mo par région de métropole
- Modèles d'IA : 10 à 40 Go selon le modèle

Commencez par l'essentiel et ajoutez au fur et à mesure.

---

## Questions sur les contenus

### Comment ajouter du contenu Wikipédia ?
1. Allez dans **Paramètres** (menu → Paramètres)
2. Cliquez sur **Explorateur de contenus**
3. Parcourez les éditions de Wikipédia disponibles
4. Cliquez sur Télécharger pour celles qui vous intéressent

L'**Explorateur de contenus** permet aussi de parcourir tous les contenus ZIM disponibles au-delà de Wikipédia.

### Comment ajouter des cours ?
1. Ouvrez **Kolibri**
2. Connectez-vous en tant qu'administrateur
3. Allez dans **Appareil → Chaînes**
4. Parcourez et importez les chaînes disponibles (de nombreuses chaînes existent en français)

### Les contenus sont-ils à jour ?
Les contenus sont à jour à la date de leur dernier téléchargement. Les instantanés de Wikipédia sont en général renouvelés chaque mois. La date figure dans le nom ou la description des fichiers.

### Où trouver des informations sur la France et l'outre-mer ?
Dans la catégorie **France & Outre-mer** : Wikivoyage (guides de toutes les régions et de tous les territoires d'outre-mer), géographie et histoire par Wikipédia, Wikisource. Côté cartes, les collections couvrent les 13 régions de métropole, les Antilles et la Guyane, l'océan Indien (La Réunion, Mayotte, TAAF) et le Pacifique (Nouvelle-Calédonie, Polynésie française, Wallis-et-Futuna).

### Puis-je ajouter mes propres fichiers ?
Oui, avec la base de connaissances. Importez PDF, fichiers texte et autres documents dans la [base de connaissances](/knowledge-base) : l'IA pourra s'y référer pour répondre à vos questions, grâce à la recherche sémantique.

Pour les contenus Kiwix, NOMAD utilise des fichiers ZIM standard. Pour les contenus éducatifs, Kolibri utilise son propre format de chaînes.

### Que sont les niveaux des collections ?
Dans l'assistant de configuration ou l'Explorateur de contenus, les collections sont organisées en trois niveaux :
- **Essentiel** — le contenu de base de la catégorie (le plus léger)
- **Standard** — l'Essentiel plus des contenus utiles en complément
- **Complet** — tout ce qui est disponible pour la catégorie (le plus lourd)

Cela permet de trouver l'équilibre entre richesse des contenus et espace disque.

---

## Questions sur l'IA

### Comment utiliser l'assistant IA ?
1. Allez dans l'[assistant IA](/chat) depuis le Centre de commande
2. Tapez votre question ou votre demande
3. L'IA répond sur le ton de la conversation

L'IA doit d'abord être installée : activez-la dans l'assistant de configuration ou installez-la depuis le [Dépôt d'applications](/supply-depot).

### Comment ajouter des documents à la base de connaissances ?
1. Allez dans **[Base de connaissances →](/knowledge-base)**
2. Importez vos documents (PDF, fichiers texte, etc.)
3. Les documents sont traités et indexés automatiquement
4. Posez vos questions dans l'assistant IA : il s'appuiera sur vos documents quand c'est pertinent

Vous pouvez aussi retirer des documents de la base de connaissances quand vous n'en avez plus besoin.

La documentation de NOMAD est ajoutée automatiquement à la base de connaissances à l'installation de l'assistant IA.

### Qu'est-ce que le banc d'essai système ?
Le banc d'essai mesure les performances de votre matériel et calcule un score NOMAD, moyenne pondérée des performances du processeur, de la mémoire, du disque et de l'IA. Vous pouvez créer un badge de constructeur (une identité NOMAD comme « Tactical-Llama-1234 ») et partager vos résultats sur le [classement communautaire](https://benchmark.projectnomad.us).

Allez dans **[Banc d'essai →](/settings/benchmark)** pour en lancer un.

### Qu'est-ce que le canal d'accès anticipé ?
Le canal d'accès anticipé vous permet de recevoir les versions candidates, avec les dernières fonctions et améliorations, avant leur sortie stable. Activez-le ou désactivez-le dans **Paramètres → Rechercher des mises à jour**. Ces versions peuvent contenir des bogues : si vous préférez la stabilité, restez sur le canal stable.

---

## Dépannage

### Une fonction ne se charge pas ou affiche une page blanche

**Essayez ceci :**
1. Attendez 30 secondes : certaines fonctions mettent du temps à démarrer
2. Rechargez la page (Ctrl+R ou Cmd+R)
3. Revenez au Centre de commande et réessayez
4. Vérifiez dans Paramètres → Système si le service tourne
5. Redémarrez le service (Arrêter puis Démarrer dans le Dépôt d'applications)

### Les cartes affichent une zone grise ou vide

Les cartes nécessitent des données téléchargées. Si vous voyez une zone vide :
1. Allez dans **Paramètres → Gestionnaire de cartes**
2. Téléchargez les régions de votre zone
3. Attendez la fin des téléchargements
4. Revenez aux cartes et rechargez la page

### ERREUR : Failed to load the XML library file '/data/kiwix-library.xml'

Cela signifie en général que la Bibliothèque d'information a démarré avant que son index Kiwix soit prêt.

Pour corriger :
1. Allez dans le **[Dépôt d'applications](/supply-depot)**
2. Arrêtez la **Bibliothèque d'information (Kiwix)**
3. Attendez 10 à 15 secondes puis redémarrez-la
4. Si l'erreur persiste, lancez **Forcer la réinstallation** pour la Bibliothèque d'information sur la même page

Une fois le redémarrage ou la réinstallation terminé, rechargez la page de la Bibliothèque d'information.

### Les réponses de l'IA sont lentes

L'IA locale demande beaucoup de puissance de calcul. Pour l'accélérer :
- **Ajoutez une carte graphique** — une carte NVIDIA avec le NVIDIA Container Toolkit peut accélérer l'IA de 10 à 20 fois ou plus
- Fermez les autres applications du serveur
- Assurez un bon refroidissement (la surchauffe ralentit le processeur)
- Essayez un modèle d'IA plus petit et plus rapide

### Comment activer l'accélération graphique pour l'IA ?

NOMAD détecte automatiquement les cartes NVIDIA quand le NVIDIA Container Toolkit est installé sur la machine hôte. Pour mettre en place l'accélération :

1. **Installez une carte graphique NVIDIA** dans votre serveur (si ce n'est pas déjà fait)
2. **Installez le NVIDIA Container Toolkit** sur la machine — suivez le [guide d'installation officiel](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)
3. **Réinstallez l'assistant IA** — allez dans le [Dépôt d'applications](/supply-depot), trouvez l'assistant IA et cliquez sur **Forcer la réinstallation**

NOMAD détectera la carte graphique pendant l'installation et configurera l'IA pour l'utiliser. Le message « NVIDIA container runtime detected » apparaît alors dans le suivi de l'installation.

**Astuce :** lancez un [banc d'essai](/settings/benchmark) avant et après pour mesurer la différence. Avec une carte graphique, on obtient souvent plus de 100 jetons par seconde, contre 10 à 15 sur le processeur seul.

### J'ai ajouté ou changé de carte graphique mais l'IA reste lente

Quand vous ajoutez ou changez de carte graphique, NOMAD doit reconfigurer le conteneur de l'IA :

1. Vérifiez que le **NVIDIA Container Toolkit** est installé sur la machine
2. Allez dans le **[Dépôt d'applications](/supply-depot)**
3. Trouvez l'**assistant IA** et cliquez sur **Forcer la réinstallation**

La réinstallation recrée le conteneur de l'IA avec la prise en charge de la carte graphique. Sans cette étape, l'IA continue de tourner uniquement sur le processeur.

### Je vois un avertissement « la carte graphique n'est pas accessible »

NOMAD vérifie que votre carte graphique est réellement accessible dans le conteneur de l'IA. Si une carte est détectée sur la machine mais ne fonctionne pas dans le conteneur, un bandeau d'avertissement apparaît sur les pages Informations système et Paramètres de l'IA. Cliquez sur le bouton de réinstallation de l'assistant IA pour recréer le conteneur avec le bon accès. Vos modèles téléchargés sont conservés.

### L'assistant IA n'est pas disponible

La page de l'assistant IA nécessite que l'assistant soit installé :
1. Allez dans le **[Dépôt d'applications](/supply-depot)**
2. Installez l'**assistant IA**
3. Attendez la fin de l'installation
4. L'assistant est ensuite accessible depuis l'écran d'accueil ou la page [Discussion](/chat)

### L'import dans la base de connaissances est bloqué

Si l'import d'un document semble bloqué :
1. Vérifiez que l'assistant IA tourne dans **Paramètres → Dépôt d'applications**
2. Les gros documents prennent du temps : patientez quelques minutes
3. Essayez d'importer un document plus petit pour vérifier que tout fonctionne
4. Cherchez d'éventuels messages d'erreur dans **Paramètres → Système**

### Le banc d'essai ne s'envoie pas au classement

Pour partager vos résultats sur le classement communautaire :
- Lancez un **banc d'essai complet** (pas Système seul ni IA seule)
- Le banc d'essai doit contenir des résultats d'IA (l'assistant IA doit être installé et fonctionner)
- Votre score doit dépasser tout envoi précédent depuis le même matériel

Si l'envoi échoue, lisez le message d'erreur pour en savoir plus.

### « Service indisponible » ou erreurs de connexion

Le service est peut-être encore en train de démarrer. Attendez 1 à 2 minutes et réessayez.

Si le problème persiste :
1. Allez dans **Paramètres → Dépôt d'applications**
2. Trouvez le service en cause
3. Cliquez sur **Redémarrer**
4. Attendez 30 secondes et réessayez

### Les téléchargements sont bloqués ou échouent

1. Vérifiez votre connexion internet
2. Allez dans **Paramètres** et vérifiez l'espace disponible
3. Si le disque est plein, supprimez des contenus inutilisés
4. Annulez le téléchargement bloqué et relancez-le

### Le serveur ne démarre pas

Si vous ne pouvez pas du tout accéder au Centre de commande :
1. Vérifiez que le serveur est allumé
2. Vérifiez la connexion réseau
3. Essayez d'y accéder directement par l'adresse IP du serveur
4. Consultez les journaux du serveur si vous avez accès à la console

### J'ai oublié mon mot de passe Kolibri

Les mots de passe Kolibri sont gérés à part :
1. Si vous êtes administrateur, vous pouvez réinitialiser les mots de passe dans la gestion des utilisateurs de Kolibri
2. Si vous avez oublié le mot de passe administrateur, il faudra peut-être le réinitialiser en ligne de commande (voyez avec votre administrateur)

---

## Mises à jour et maintenance

### Comment mettre à jour NOMAD ?
1. Allez dans **Paramètres → Rechercher des mises à jour**
2. Si une mise à jour est disponible, cliquez pour l'installer
3. Le système télécharge la mise à jour et redémarre automatiquement
4. Cela prend en général 2 à 5 minutes

Pour cette version française, vous pouvez aussi lancer `sudo bash /opt/project-nomad/update_nomad.sh`, qui récupère la dernière image publiée.

### Faut-il mettre à jour régulièrement ?
Oui, tant que vous avez internet. Les mises à jour apportent :
- des corrections de bogues ;
- de nouvelles fonctions ;
- des améliorations de sécurité ;
- de meilleures performances.

### NOMAD peut-il se mettre à jour tout seul ?
Oui. NOMAD peut tenir à jour son logiciel, ses applications installées et ses contenus. Les mises à jour automatiques sont **désactivées par défaut** : activez ce que vous voulez dans **Paramètres → Mises à jour** (et, pour les applications, avec l'interrupteur de chaque application dans le Dépôt d'applications). Elles ne se font que dans le créneau horaire choisi, après des vérifications de sécurité, et n'installent jamais automatiquement une version majeure. Voir le **[guide des mises à jour](/docs/updates)**.

### Comment mettre à jour les contenus (Wikipédia, etc.) ?
Les mises à jour des contenus sont séparées de celles du logiciel :
1. Allez dans **Paramètres → Gestionnaire de contenus** ou **Explorateur de contenus**
2. Vérifiez s'il existe des versions plus récentes de vos contenus
3. Téléchargez les nouvelles versions si besoin

Vous pouvez aussi activer les **mises à jour automatiques des contenus** pour que les bibliothèques Wikipédia/ZIM et les régions de carte se renouvellent seules la nuit — voir le [guide des mises à jour](/docs/updates).

Astuce : de nouveaux instantanés de Wikipédia sortent environ chaque mois.

### Que se passe-t-il si une mise à jour échoue ?
Le système est conçu pour s'en remettre proprement. Si une mise à jour échoue :
1. La version précédente doit continuer de fonctionner
2. Réessayez plus tard
3. Cherchez des messages d'erreur dans Paramètres → Système

### Maintenance en ligne de commande

Pour un dépannage avancé, ou si l'interface web est inaccessible, NOMAD fournit des scripts dans `/opt/project-nomad` :

**Démarrer tous les services :**
```bash
sudo bash /opt/project-nomad/start_nomad.sh
```

**Arrêter tous les services :**
```bash
sudo bash /opt/project-nomad/stop_nomad.sh
```

**Mettre à jour le Centre de commande :**
```bash
sudo bash /opt/project-nomad/update_nomad.sh
```
*Remarque : ce script met à jour uniquement le Centre de commande, pas les applications. Mettez-les à jour depuis l'interface web.*

**Désinstaller NOMAD :**
```bash
curl -fsSL https://raw.githubusercontent.com/Ti-guigui/project-nomad/refs/heads/main/install/uninstall_nomad.sh -o uninstall_nomad.sh
sudo bash uninstall_nomad.sh
```
*Attention : c'est irréversible. Toutes les données seront supprimées.*

---

## Vie privée et sécurité

### Mes données restent-elles privées ?
Oui. NOMAD tourne entièrement sur votre matériel. Vos recherches, vos conversations avec l'IA et vos données d'utilisation ne quittent jamais votre serveur.

### D'autres personnes peuvent-elles accéder à mon serveur ?
Par défaut, NOMAD est accessible sur votre réseau local : toute personne connectée au même réseau peut y accéder. Sur un réseau public, prévoyez des mesures de sécurité supplémentaires.

### L'IA envoie-t-elle des données quelque part ?
Non. L'IA tourne entièrement en local. Vos conversations ne sont envoyées à aucun service extérieur. L'assistant est intégré au Centre de commande : il n'y a pas de service séparé à configurer.

---

## Obtenir plus d'aide

### L'IA peut vous aider
Posez votre question dans l'[assistant IA](/chat). L'IA locale répond sur de nombreux sujets, y compris le dépannage technique. La documentation de NOMAD étant dans la base de connaissances, elle peut aussi répondre aux questions sur NOMAD.

### Consultez la documentation
Vous y êtes. Utilisez le menu pour trouver un sujet précis.

### Rejoignez la communauté
Obtenez de l'aide d'autres utilisateurs de NOMAD sur **[Discord](https://discord.com/invite/crosstalksolutions)** (en anglais), ou signalez un problème de la version française sur [GitHub](https://github.com/Ti-guigui/project-nomad/issues).

### Notes de version
Découvrez ce qui change à chaque version : **[Notes de version](/docs/release-notes)** (en anglais).
