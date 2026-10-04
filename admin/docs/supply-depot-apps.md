# Applications du dépôt

Le Dépôt d'applications permet d'installer sur votre NOMAD des applications en plus des outils intégrés. Chacune tourne dans son propre conteneur, entièrement hors ligne, et affiche un bouton **Ouvrir** une fois installée.

Cette page explique ce qu'il faut savoir pour démarrer avec chaque application *sur NOMAD* : faut-il se connecter, quels sont les identifiants par défaut, où vont vos fichiers, et ce qu'il faut avoir sous la main. Elle n'explique pas comment utiliser les applications elles-mêmes : chacune est un projet libre avec sa propre documentation, vers laquelle nous renvoyons à chaque fois.

Un mot sur les connexions : certaines applications ont leurs propres comptes, distincts de NOMAD. Quand une application demande de vous connecter, nous indiquons les identifiants de départ et s'il faut les changer.

---

## Gérer vos applications

Chaque application installée a un menu **Gérer** sur sa carte. Vous pouvez y :

- **Documentation** — aller directement aux notes de démarrage de cette application (les sections ci-dessous).
- **Modifier** — changer les réglages de l'application : redirections de ports, montages de volumes, variables d'environnement et limites de mémoire/processeur. Cela fonctionne aussi pour les applications du catalogue, pas seulement les personnalisées. Vos modifications sont fusionnées avec la configuration existante, donc les réglages avancés (comme l'accès à la carte graphique de l'assistant IA) sont conservés, et une application modifiée n'est plus écrasée par les mises à jour du catalogue.
- **Journaux** et **Statistiques** — voir en direct les journaux d'une application ou sa consommation de mémoire et de processeur, pratique quand quelque chose ne va pas.
- **Mettre à jour** et **Supprimer** — installer la dernière version d'une application, ou la supprimer (avec son image si vous le souhaitez). Si le nouveau conteneur ne démarre pas après une mise à jour, NOMAD revient automatiquement à la version qui fonctionnait.

**Connaître la version installée :** chaque carte affiche la version installée à côté du nom (par exemple `Kiwix · 3.7.0`). Quand une version plus récente existe, une pastille orange **Mise à jour disponible** apparaît sur la carte.

**Liens « Ouvrir » personnalisés :** par défaut, le bouton **Ouvrir** pointe vers l'application à l'adresse de votre NOMAD. Si vous utilisez un proxy inverse ou un DNS local et préférez une adresse plus parlante (par exemple `https://jellyfin.maison.lan`), utilisez **Gérer › Modifier** pour définir une URL de lancement personnalisée. NOMAD garde le lien d'origine, vous pouvez donc revenir en arrière, et votre réglage survit aux mises à jour.

**Mettre à jour automatiquement les applications :** les applications installées peuvent se mettre à jour seules. Cela s'active à deux niveaux — un interrupteur général dans **Paramètres → Mises à jour** et un interrupteur par application dans le Dépôt — et seules les versions mineures et correctives sont installées automatiquement (les versions majeures restent manuelles). Voir le [guide des mises à jour](/docs/updates).

---

## Ajouter votre propre application

Au-delà du catalogue, le Dépôt peut faire tourner **votre propre conteneur Docker** comme application gérée, à côté des autres. Cliquez sur **Ajouter une application personnalisée** et indiquez à NOMAD :

- l'**image** à télécharger (par exemple `ghcr.io/proprietaire/app:1.2.3`),
- les **redirections de ports**, **montages de volumes**, **variables d'environnement** et **limites de mémoire/processeur** nécessaires.

Pendant la saisie, NOMAD vérifie la configuration en direct et vous avertit des conflits de ports ou des réglages risqués. Certains avertissements (registre non reconnu, étiquette `:latest` impossible à suivre) sont indicatifs et vous pouvez **installer quand même** ; les configurations vraiment dangereuses sont bloquées.

Une fois installée, une application personnalisée se comporte comme les autres : même menu **Gérer** (Modifier, Journaux, Statistiques, Mettre à jour, Supprimer), version affichée sur la carte, mises à jour automatiques possibles. NOMAD sécurise les montages de dossiers de la machine et limite journaux et statistiques à ses propres conteneurs : une application personnalisée ne peut pas sortir de ce que vous lui donnez.

> Une application personnalisée est exactement cela : la vôtre. NOMAD la fait tourner sans s'en mêler ; il ne fournit ni documentation ni assistance pour les logiciels hors catalogue. Consultez la documentation du projet concerné.

---

## Stirling PDF {% #stirling-pdf %}

Une boîte à outils complète pour les PDF, sur votre propre matériel. Fusionner et découper des fichiers, convertir vers et depuis le PDF, compresser, pivoter, ajouter ou retirer un mot de passe, reconnaître le texte des documents numérisés (OCR) pour les rendre consultables, signer, tamponner, caviarder… Plus de 50 outils, et comme tout tourne en local, vos documents ne quittent jamais votre NOMAD.

**Site officiel :** [stirlingpdf.com](https://stirlingpdf.com) · **Code source :** [github.com/Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)

**À la première ouverture :** l'application s'ouvre directement sur les outils, sans connexion. Stirling est configuré pour sauter son écran de connexion : sur NOMAD, c'est un outil personnel sur votre propre réseau, et un mot de passe ne ferait que gêner. « Guest » s'affiche en bas à gauche, c'est normal.

**Attention, il démarre lentement :** Stirling PDF est une grosse application Java. Après l'installation, laissez-lui 30 à 60 secondes pour démarrer complètement. Il demande aussi pas mal de mémoire (environ un gigaoctet) : il est plus à l'aise sur un NOMAD qui a de la marge.

**Vous voulez un mot de passe ?** Si vous préférez que Stirling demande une connexion (par exemple si plusieurs personnes partagent votre NOMAD), vous pouvez la réactiver depuis NOMAD :

1. Dans le Dépôt d'applications, trouvez Stirling PDF et cliquez sur **Gérer > Modifier**.
2. Dans **Variables d'environnement**, remplacez `SECURITY_ENABLELOGIN=false` par `SECURITY_ENABLELOGIN=true`.
3. Enregistrez. NOMAD reconstruit l'application, et l'écran de connexion revient.

À la première connexion, utilisez l'identifiant `admin` et le mot de passe `stirling`. Stirling vous demandera aussitôt de choisir votre propre mot de passe. C'est le seul moyen de réactiver la connexion : le menu de réglages de Stirling n'est accessible qu'une fois connecté, donc c'est depuis l'écran Modifier de NOMAD qu'on l'active, pas depuis Stirling.

**Vos données :** vos réglages sont dans le dossier `storage/stirling-pdf` de votre NOMAD. Les PDF que vous traitez sont envoyés pour l'opération puis récupérés sur votre appareil. Stirling n'est pas une bibliothèque : il ne conserve pas vos documents.

**D'où viennent vos PDF (et pourquoi vous ne voyez pas les fichiers de NOMAD) :** Stirling travaille sur les fichiers de l'appareil que vous utilisez — ordinateur, téléphone ou tablette. Vous cliquez sur « Open from computer », choisissez un PDF, le traitez, puis téléchargez le résultat sur cet appareil. Stirling ne peut pas accéder aux fichiers stockés ailleurs sur votre NOMAD : il ne voit ni votre dossier de livres, ni vos documents de la base de connaissances, ni ce qui se trouve dans File Browser. Si le PDF est déjà sur votre NOMAD, téléchargez-le d'abord (depuis File Browser par exemple), puis ouvrez cette copie dans Stirling. C'est une étape de plus, mais c'est aussi ce qui garde vos fichiers exactement là où vous les avez mis.

**Fonctionne hors ligne :** tous les outils PDF tournent en local, donc la boîte à outils fonctionne entièrement hors ligne. Quelques fonctions annexes utilisent internet et ne font rien hors connexion : l'import « Google Drive » et les liens du pied de page (Survey, Discord, GitHub). Aucune n'est utile pour traiter des PDF. La seule fonction principale avec une partie en ligne est l'OCR : l'anglais est installé d'office, et ajouter d'autres langues (dont le français) nécessite une connexion.

## File Browser {% #file-browser %}

Un gestionnaire de fichiers web pour votre NOMAD. Parcourez les dossiers, envoyez et téléchargez des fichiers, créez des dossiers, renommez, déplacez et supprimez, le tout depuis votre navigateur, sans rien installer sur votre ordinateur. Pratique pour mettre des fichiers sur l'appareil ou en récupérer, ou faire du rangement sans passer par la ligne de commande.

**Site officiel :** [filebrowser.org](https://filebrowser.org) · **Code source :** [github.com/filebrowser/filebrowser](https://github.com/filebrowser/filebrowser)

**À la première ouverture :** un écran de connexion s'affiche. Connectez-vous avec l'identifiant `admin` et le mot de passe `nomad`. **Changez ce mot de passe tout de suite.** C'est le même sur tous les NOMAD : tant que vous ne l'avez pas changé, n'importe qui sur votre réseau qui le connaît peut entrer. Cliquez sur l'engrenage des réglages, ouvrez les réglages de votre profil et choisissez un nouveau mot de passe.

Contrairement à la plupart des applications ici, File Browser garde volontairement sa connexion : il peut renommer et supprimer de vrais fichiers sur votre NOMAD, un mot de passe s'impose donc, même sur votre propre réseau.

**Ce que vous voyez :** File Browser regroupe les dossiers de contenus de votre NOMAD :

- **books** — livres numériques, dont ceux que Calibre-Web doit lire
- **maps** — données cartographiques téléchargées
- **media** — vidéos, musique et photos, dont ce que Jellyfin doit diffuser
- **zim** — contenus hors ligne téléchargés, comme Wikipédia et les autres bibliothèques
- **kb_uploads** — documents ajoutés à la base de connaissances

Vous pouvez y envoyer, télécharger, renommer, déplacer et supprimer des fichiers, et ce que vous déposez à la racine est aussi conservé. Les dossiers techniques utilisés par les applications (modèles d'IA, index de recherche, coffre de mots de passe…) sont volontairement masqués, pour éviter de les parcourir ou de les supprimer par erreur.

> **Attention aux suppressions :** ce que vous supprimez ici disparaît vraiment, il n'y a pas de corbeille. Les contenus sont pour la plupart récupérables (une carte ou une bibliothèque Wikipédia se retélécharge), mais un livre ou une vidéo que vous avez ajouté vous-même sera perdu. Supprimez avec le même soin que sur votre propre ordinateur.

**Fonctionne hors ligne :** entièrement. File Browser tourne sur votre NOMAD et n'utilise jamais internet.

## Calibre-Web {% #calibre-web %}

Une liseuse et un gestionnaire de bibliothèque web pour vos livres numériques. Lisez dans votre navigateur, classez par auteur, série et étiquette, et envoyez vos livres vers une Kindle ou une autre liseuse. Calibre-Web s'appuie sur le dossier des livres de votre NOMAD : toute votre bibliothèque vit sur l'appareil et voyage avec lui.

**Site officiel :** [github.com/janeczku/calibre-web](https://github.com/janeczku/calibre-web)

**À la première ouverture :** Calibre-Web a besoin d'une bibliothèque, et NOMAD en crée une vide à l'installation pour éviter toute erreur. Voici la marche à suivre, une seule fois :

1. Ouvrez Calibre-Web. Il affiche un écran **Database Configuration**.
2. Dans le champ **Location of Calibre Database**, tapez `/books` et cliquez sur **Save**. Le message « Database Settings updated » s'affiche et votre bibliothèque (vide) s'ouvre.
3. C'est tout. Votre bibliothèque est prête à être remplie.

Si une connexion est demandée, les identifiants par défaut sont `admin` / `admin123`. **Changez ce mot de passe** une fois connecté (cliquez sur `admin` en haut à droite, puis Edit). C'est le même sur tous les NOMAD. L'interface peut être passée en français dans les réglages de l'utilisateur.

**Ajouter des livres :** l'envoi par la page web est désactivé par défaut. Pour l'activer, allez dans **Admin** (en haut à droite) et modifiez la configuration de base pour autoriser les envois : un bouton Upload apparaît. Vous pouvez aussi déposer les livres directement dans le dossier books avec File Browser, puis lancer l'analyse de Calibre-Web pour qu'il les détecte.

**Vos données :** votre bibliothèque est dans le dossier `books` de votre NOMAD (le même que dans File Browser). Sauvegarder ce dossier sauvegarde toute votre collection.

**Fonctionne hors ligne :** la lecture et la gestion de la bibliothèque fonctionnent entièrement hors ligne. Seule la récupération des métadonnées (couvertures et résumés depuis des sources en ligne) a besoin d'internet ; elle ne fait rien hors connexion, sans gêner la lecture ni le classement.

## IT Tools {% #it-tools %}

Plus de 100 petits utilitaires que vous chercheriez sinon en ligne : générateurs d'empreintes (hash), encodeurs base64 et URL, formateurs JSON et SQL, générateurs d'UUID, création de QR codes, convertisseurs de couleurs et bien plus. Tout tourne en local sur votre NOMAD, sans connexion internet.

**Site officiel :** [it-tools.tech](https://it-tools.tech) · **Code source :** [github.com/CorentinTh/it-tools](https://github.com/CorentinTh/it-tools)

**À la première ouverture :** l'application s'ouvre directement sur les outils. Pas de connexion, pas de compte, rien à configurer. Choisissez un outil dans la barre latérale. La langue se change dans l'interface (français disponible).

**Vos données :** rien à gérer. IT Tools ne stocke rien sur votre NOMAD d'une session à l'autre : pas de fichiers, pas de bibliothèque, pas d'identifiants. C'est l'application la plus simple du Dépôt.

**Fonctionne hors ligne :** chaque outil tourne dans votre navigateur à partir de la copie présente sur votre NOMAD. Rien n'utilise internet.

## Excalidraw {% #excalidraw %}

Un tableau blanc virtuel pour des schémas et croquis rapides au style dessiné à la main. Dessinez des boîtes, des flèches et des formes libres, ajoutez du texte et des images, et esquissez un organigramme, un schéma réseau ou une idée en quelques secondes. Le tout a un air sympathique de croquis sur un coin de nappe, et tourne dans votre navigateur.

**Site officiel :** [excalidraw.com](https://excalidraw.com) · **Code source :** [github.com/excalidraw/excalidraw](https://github.com/excalidraw/excalidraw)

**À la première ouverture :** l'application s'ouvre sur une toile vierge. Pas de connexion, pas de compte. Choisissez une forme dans la barre d'outils et dessinez. Un court message rappelle que votre travail est enregistré dans votre navigateur — c'est le point essentiel à comprendre sur Excalidraw dans NOMAD.

**Où sont vos dessins (à lire) :** cette version d'Excalidraw n'a aucun stockage sur votre NOMAD. Votre dessin est enregistré dans le navigateur que vous utilisez, sur cet appareil uniquement. Conséquences :

- Vos dessins **ne sont pas partagés entre appareils**. Ce que vous dessinez sur votre ordinateur n'apparaîtra pas sur votre téléphone, chaque navigateur gardant sa propre copie.
- Si vous **effacez les données du navigateur**, ou utilisez une fenêtre de navigation privée, le dessin disparaît. Aucune copie n'existe sur le NOMAD.
- Donc **enregistrez votre travail dans un fichier.** Utilisez le menu (en haut à gauche) pour **enregistrer** un fichier `.excalidraw` et rangez-le en lieu sûr, par exemple dans votre dossier media ou documents via File Browser. Pour reprendre plus tard, utilisez **Ouvrir** et chargez ce fichier. C'est la seule façon de conserver un dessin à long terme ou de le passer sur un autre appareil.

**Vos données :** tout restant dans votre navigateur, il n'y a ni dossier NOMAD ni identifiants à gérer. Les fichiers enregistrés sont là où vous les mettez.

**Fonctionne hors ligne :** le tableau blanc fonctionne hors ligne : dessiner, modifier et enregistrer des fichiers sans internet. Trois choses à savoir :

- **La police manuscrite caractéristique vient d'internet.** Hors ligne, Excalidraw ne peut pas la récupérer et utilise une police simple : vos schémas ont l'air un peu moins « croqués ». Les dessins eux-mêmes ne sont pas affectés.
- **Excalidraw envoie des statistiques d'utilisation anonymes quand votre NOMAD est en ligne.** L'application inclut un suivi basique des pages vues (via le service Simple Analytics) qui enregistre son ouverture. Il ne voit pas vos dessins et ne peut rien envoyer hors ligne, mais nous préférons vous le signaler, NOMAD étant par ailleurs conçu pour rester discret.
- **Quelques boutons sont des fonctions cloud qui ne marchent pas sur NOMAD.** « Live collaboration », « Sign up » et « Excalidraw+ » renvoient vers le service payant en ligne des créateurs. Ignorez-les. Même chose pour la **bibliothèque** de formes, qui vient d'une galerie en ligne.

## Homebox {% #homebox %}

Un inventaire domestique pour garder la trace de tout ce que vous possédez. Classez vos biens par emplacement et étiquette, ajoutez des photos, notez numéros de série, prix d'achat, dates de garantie et factures, et retrouvez tout par la recherche. Très utile pour l'assurance habitation, le suivi des garanties et savoir ce que vous avez et où.

**Site officiel :** [homebox.software](https://homebox.software) · **Code source :** [github.com/sysadminsmedia/homebox](https://github.com/sysadminsmedia/homebox)

**À la première ouverture :** Homebox affiche un écran de connexion, mais vous n'avez pas encore de compte : il faut en créer un. Cliquez sur **Register**, puis renseignez :

- **votre e-mail** (qui sert d'identifiant),
- **votre nom**,
- **un mot de passe** (Homebox affiche un indicateur de robustesse et refuse l'inscription tant que le mot de passe n'est pas assez fort).

Cliquez sur **Register**, puis connectez-vous avec cet e-mail et ce mot de passe. Le premier compte créé est le **propriétaire** de ce Homebox. Il n'y a pas d'identifiants par défaut à changer.

**Vous partagez votre NOMAD ?** Par défaut, toute personne qui accède à Homebox peut créer un compte. Pas de souci si vous êtes seul ou si vous faites confiance à tout votre réseau. Pour empêcher toute nouvelle inscription après la vôtre :

1. Créez d'abord votre compte propriétaire (ci-dessus).
2. Dans le Dépôt d'applications, trouvez Homebox et cliquez sur **Gérer > Modifier**.
3. Dans **Variables d'environnement**, ajoutez `HBOX_OPTIONS_ALLOW_REGISTRATION=false`.
4. Enregistrez. NOMAD reconstruit l'application, et le bouton Register ne crée plus de comptes. Vous pouvez toujours vous connecter normalement.

**Vos données :** tout ce que Homebox stocke est dans un seul dossier de votre NOMAD, `storage/homebox`, sous forme d'une base de données (plus les photos et factures jointes). Sauvegarder ce dossier sauvegarde tout votre inventaire.

**Fonctionne hors ligne :** entièrement. Homebox tourne sur votre NOMAD, garde toutes vos données en local et n'a aucun suivi d'utilisation. Les liens de son en-tête (GitHub, Discord, site du projet) ont besoin d'internet, mais ce ne sont que des raccourcis vers les pages du projet.

## Vaultwarden {% #vaultwarden %}

Un gestionnaire de mots de passe privé qui tourne sur votre NOMAD. Compatible avec Bitwarden : vous stockez identifiants, notes sécurisées et cartes bancaires dans un coffre chiffré, et utilisez les extensions de navigateur et applications mobiles officielles de Bitwarden, pointées vers votre NOMAD plutôt que vers le cloud de quelqu'un d'autre.

**Site officiel :** [bitwarden.com](https://bitwarden.com) (applications et extensions) · **Code source :** [github.com/dani-garcia/vaultwarden](https://github.com/dani-garcia/vaultwarden)

**À la première ouverture, un avertissement de sécurité s'affiche. C'est normal, voici pourquoi :** un gestionnaire de mots de passe ne fonctionne qu'en connexion sécurisée (HTTPS), donc NOMAD configure Vaultwarden en HTTPS automatiquement. Votre NOMAD étant un appareil privé et non un site public, il utilise un certificat auto-signé, et les navigateurs affichent un avertissement la première fois. C'est impressionnant mais normal pour un appareil de votre propre réseau. Pour passer outre, une seule fois :

1. Cliquez sur **Ouvrir** sur la carte Vaultwarden. Le navigateur affiche un message comme *« Votre connexion n'est pas privée »* ou *« Non sécurisé »*.
2. Cliquez sur **Paramètres avancés**, puis **Continuer vers (l'adresse de votre NOMAD)**. (Selon le navigateur : « Continuer » ou « Accepter le risque ».)
3. Vous arrivez sur le coffre Vaultwarden. Le navigateur retient votre choix : l'avertissement ne reviendra plus sur cet appareil.

**Créer votre coffre :** sur la page de connexion, cliquez sur **Créer un compte**, puis indiquez votre **e-mail** et un **mot de passe principal**.

> **Votre mot de passe principal est irrécupérable.** Vaultwarden n'a ni e-mail « mot de passe oublié » ni réinitialisation, par conception, puisqu'il ne voit jamais votre mot de passe. Si vous l'oubliez, le coffre et tout son contenu restent verrouillés pour toujours. Choisissez un mot de passe fort que vous ne perdrez pas, et pensez à le noter dans un endroit physique sûr.

**Vous partagez votre NOMAD ?** Par défaut, toute personne qui accède à Vaultwarden peut créer un compte (chaque compte est séparé et chiffré). Pour bloquer les nouvelles inscriptions après la vôtre :

1. Créez d'abord votre propre compte.
2. Dans le Dépôt d'applications, trouvez Vaultwarden et cliquez sur **Gérer > Modifier**.
3. Dans **Variables d'environnement**, ajoutez `SIGNUPS_ALLOWED=false`.
4. Enregistrez. NOMAD reconstruit l'application et les inscriptions sont fermées ; les comptes existants continuent de fonctionner.

**Depuis votre téléphone et votre navigateur :** installez l'application ou l'extension officielle Bitwarden, et sur son écran de connexion choisissez **auto-hébergé** (ou « URL du serveur ») puis saisissez `https://(adresse de votre NOMAD):8480`. Certaines applications mobiles sont plus strictes avec les certificats auto-signés et peuvent refuser de se connecter ; le coffre web ouvert depuis NOMAD fonctionne toujours.

**Vos données :** votre coffre chiffré est dans le dossier `storage/vaultwarden` de votre NOMAD. Sauvegarder ce dossier sauvegarde tout. (Le panneau d'administration intégré est désactivé sauf si vous définissez un jeton d'administration, ce dont la plupart des gens n'ont pas besoin.)

**Fonctionne hors ligne :** entièrement, et en toute confidentialité. Vaultwarden tourne sur votre NOMAD, stocke votre coffre en local et ne contacte personne. Les applications et extensions Bitwarden gardent aussi une copie locale du coffre : elles lisent vos mots de passe même quand votre NOMAD ou votre téléphone est hors ligne.

## Jellyfin {% #jellyfin %}

Votre propre serveur multimédia. Indiquez à Jellyfin un dossier de films, séries, musique et photos sur votre NOMAD : il organise tout avec affiches et informations, et diffuse vers un navigateur, un téléphone, une tablette, une télévision connectée ou les applications Jellyfin. Une alternative privée et hors ligne aux grandes plateformes de streaming, pour les médias que vous possédez déjà.

**Site officiel :** [jellyfin.org](https://jellyfin.org) · **Code source :** [github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)

**À la première ouverture, un assistant de configuration se lance.** Quelques écrans rapides :

1. **Langue** — choisissez la langue d'affichage (Français) et cliquez sur Suivant.
2. **Créez votre compte administrateur** — saisissez un identifiant et un mot de passe. C'est le compte principal qui gère le serveur : donnez-lui un vrai mot de passe et notez-le. (Vous pourrez ajouter d'autres utilisateurs, y compris des comptes limités pour les enfants, depuis le tableau de bord.)
3. **Ajoutez vos médias** — cliquez sur **Ajouter une médiathèque** et choisissez un type de contenu. Pour simplifier, NOMAD a déjà créé un dossier par type dans votre dossier media ; il suffit de faire pointer chaque médiathèque vers le bon :
   - médiathèque **Films** → dossier `Movies`
   - médiathèque **Séries** → dossier `TV Shows`
   - médiathèque **Musique** → dossier `Music`
   - médiathèque **Photos** → dossier `Photos`

   **Faites pointer chaque médiathèque vers son propre dossier, pas vers tout le dossier `media`.** C'est important : si une médiathèque pointe vers `media` (qui contient tous les autres) et une autre vers `Music` à l'intérieur, Jellyfin voit les mêmes fichiers revendiqués deux fois, parle de « chemin en double », et votre musique n'apparaît pas, sans message. Un dossier par médiathèque, et tout fonctionne. Vous pouvez aussi sauter cette étape et ajouter les médiathèques plus tard depuis le tableau de bord.
4. **Métadonnées, accès distant, fin** — acceptez les valeurs par défaut des derniers écrans et terminez. Connectez-vous ensuite avec le compte créé.

**Ajouter vos médias :** déposez vos fichiers dans le sous-dossier correspondant du dossier **media** de votre NOMAD (le même que dans File Browser) : films dans **Movies**, séries dans **TV Shows**, musique dans **Music** (un dossier par album, c'est idéal), images dans **Photos**. Le plus simple : envoyez les fichiers avec File Browser, puis dans Jellyfin cliquez sur **Actualiser la médiathèque**. Jellyfin lit les sous-dossiers : un dossier d'album déposé dans **Music** apparaît comme un album. Des noms de fichiers clairs (par exemple `Nom du film (2020).mp4`) l'aident à trouver les bonnes affiches et informations.

**Vos données :** vos médias sont dans `storage/media`. Les réglages de Jellyfin, les comptes et les affiches téléchargées sont dans `storage/jellyfin`. Vos fichiers ne sont jamais modifiés : Jellyfin se contente de les lire.

**Fonctionne hors ligne :** la diffusion de vos médias fonctionne entièrement hors ligne, c'est tout l'intérêt. Seule la **récupération des métadonnées** utilise internet : quand Jellyfin ajoute un film ou une série, il essaie de télécharger affiche, résumé et distribution depuis des bases en ligne. Hors ligne, les éléments apparaissent avec leur simple nom et sans affiche, mais se lisent parfaitement. De retour en ligne, une actualisation complète les affiches manquantes.

> **À propos des performances de lecture :** Jellyfin lit la plupart des fichiers sans effort, mais si le format d'une vidéo n'est pas pris en charge par votre appareil, il doit la convertir à la volée (« transcodage »), ce qui sollicite beaucoup le processeur. NOMAD ne configure pas l'accélération par carte graphique pour cela par défaut : de très grosses vidéos ou des vidéos haute résolution peuvent saccader sur un NOMAD modeste. Des fichiers dans un format très répandu (comme MP4/H.264) évitent le transcodage.

## Meshtastic Web {% #meshtastic-web %}

Un panneau de contrôle web pour les appareils [Meshtastic](https://meshtastic.org). Meshtastic, c'est de la messagerie radio longue portée, hors réseau : de petites radios LoRa bon marché qui forment leur propre réseau maillé et transmettent messages et positions GPS sur des kilomètres, sans réseau mobile, sans internet et sans abonnement. Cette application permet de configurer ces radios et de lire et envoyer des messages sur un grand écran.

**Site officiel :** [meshtastic.org](https://meshtastic.org) · **Code source :** [github.com/meshtastic/web](https://github.com/meshtastic/web)

**Il faut une radio Meshtastic.** Cette application n'est que le panneau de contrôle. Seule, elle affiche « No devices connected », car le vrai travail se fait sur un appareil Meshtastic physique (et le réseau des autres radios). Sans radio, elle ne sert pas à grand-chose.

> **En France :** les radios LoRa doivent utiliser la bande **EU_868** (868 MHz), autorisée sans licence. Choisissez ce réglage de région sur votre radio.

**À la première ouverture :** l'application s'ouvre directement, sans connexion. Cliquez sur **New Connection** : trois façons de se connecter à votre radio s'affichent :

- **HTTP** — se connecter à une radio déjà reliée à votre Wi-Fi, en tapant son adresse IP. **C'est la méthode à utiliser sur NOMAD** (voir ci-dessous).
- **Bluetooth** — s'appairer avec une radio proche en Bluetooth.
- **Serial** — se connecter à une radio branchée en USB.

**La particularité de NOMAD (Bluetooth et Serial exigent le HTTPS) :** les navigateurs n'autorisent un site à utiliser le Bluetooth ou l'USB que si la page est chargée en HTTPS. NOMAD sert Meshtastic Web en simple HTTP, donc **les options Bluetooth et Serial ne se connectent pas** : votre navigateur les bloque. Celle qui fonctionne est **HTTP** : reliez votre radio Meshtastic au même Wi-Fi (elles savent le faire), puis connectez-vous à son adresse IP. Pour un appairage USB ou Bluetooth, utilisez plutôt l'application mobile ou le site officiel de Meshtastic.

**Vos données :** rien à configurer ni à stocker sur votre NOMAD. Les réglages de la radio sont sur la radio, et les préférences de l'application dans votre navigateur.

**Fonctionne hors ligne :** entièrement, c'est tout le principe de Meshtastic. L'application est servie par votre NOMAD, et la communication avec vos radios passe par votre réseau local ou la radio, jamais par internet. Seuls les liens du pied de page (Vercel, mentions légales) sont en ligne.

## Plateforme éducative (Kolibri) {% #kolibri %}

Une plateforme d'apprentissage hors ligne complète, créée par Learning Equality. Kolibri réunit leçons vidéo, exercices et lectures en chaînes structurées, les organise en classes et leçons, suit la progression des élèves et fonctionne entièrement sur votre NOMAD, sans internet. Elle est conçue pour les écoles et les élèves des lieux peu ou pas connectés.

**Site officiel :** [learningequality.org/kolibri](https://learningequality.org/kolibri) · **Code source :** [github.com/learningequality/kolibri](https://github.com/learningequality/kolibri)

**À la première ouverture, un assistant de configuration rapide se lance.** Choisissez le type d'établissement et créez le **compte administrateur** (le super-utilisateur qui gère tout l'appareil : donnez-lui un vrai mot de passe et notez-le). Ensuite, vous importez des contenus sous forme de **chaînes**. L'interface de Kolibri existe en français.

**Importer des contenus :** les contenus de Kolibri sont des chaînes à importer. Ouvrez **Appareil → Chaînes → Importer**, puis récupérez des chaînes depuis Kolibri Studio (en ligne) ou importez-les depuis un disque local ou un autre appareil Kolibri. Le choix est vaste (dont de nombreuses chaînes en français) : n'importez que ce dont vous avez besoin, certaines sont volumineuses.

**Migrer les contenus de la Plateforme éducative (1re génération) :** les anciennes versions de NOMAD livraient un Kolibri bien plus ancien (l'image `treehouses/kolibri:0.12.8`). La Plateforme éducative « Gen 2 » est un Kolibri officiel récent, installé **à neuf** : vos anciennes chaînes et données d'élèves **ne sont pas** reprises automatiquement, les deux versions stockant les données trop différemment pour une migration sûre. Pour importer vos chaînes existantes dans la nouvelle version :

1. Installez « Education Platform (Gen 2) » depuis le catalogue (elle tourne à côté de l'ancienne sur un autre port, rien n'est perturbé pendant la mise en place).
2. Lancez la nouvelle, suivez l'assistant de configuration, puis dans le menu latéral allez dans **Appareil > Chaînes > Importer**. Choisissez « Réseau local ou internet », puis « Ajouter un appareil ». Dans la fenêtre, saisissez l'adresse IP de votre NOMAD avec le port de l'ancienne plateforme (8300 par défaut, par exemple `http://192.168.1.36:8300`), donnez-lui un nom, cliquez sur « Ajouter » puis « Continuer ».
3. Sélectionnez les chaînes de l'ancienne plateforme une par une, ou choisissez de sélectionner les chaînes entières pour tout importer d'un coup. Cliquez sur « Importer » : le transfert démarre.
4. Une fois satisfait de la nouvelle installation et les contenus copiés, désinstallez l'ancienne Plateforme éducative depuis sa carte (elle porte un badge **legacy**). Il est conseillé de supprimer aussi l'ancienne image et le volume de données pour éviter toute confusion et libérer de l'espace, mais vous pouvez la garder quelque temps par précaution.

**Vos données :** vos chaînes importées, classes et progressions sont dans le dossier `storage/kolibri-gen2` de votre NOMAD. Sauvegarder ce dossier sauvegarde tout Kolibri.

**Fonctionne hors ligne :** entièrement, une fois les contenus importés : c'est la raison d'être de Kolibri. Seul l'import de chaînes depuis Kolibri Studio utilise internet ; tout le reste (leçons, exercices, suivi) tourne sur votre NOMAD.

## MeshCore Web {% #meshcore-web %}

Un client web pour les radios [MeshCore](https://meshcore.io). MeshCore est une autre approche de la messagerie radio LoRa maillée, longue portée et hors réseau, cousine de Meshtastic : de petites radios qui forment leur propre réseau et transmettent texte et position sur des kilomètres, sans réseau mobile, sans internet et sans abonnement. Cette application permet de configurer une radio MeshCore et de lire et envoyer des messages sur un grand écran. Si vous n'utilisez pas déjà du matériel MeshCore, Meshtastic (ci-dessus) est le point de départ le plus courant.

**Site officiel :** [meshcore.io](https://meshcore.io) · **Code source :** [github.com/aXistem-dev/meshcore-web](https://github.com/aXistem-dev/meshcore-web) (une version empaquetée du client MeshCore de Liam Cottle)

**Il faut une radio MeshCore.** Comme pour Meshtastic, ce n'est que le panneau de contrôle. Sans radio connectée, il n'a personne à qui parler.

**À la première ouverture, un avertissement de sécurité s'affiche. C'est normal, voici pourquoi :** MeshCore se connecte à votre radio en USB ou Bluetooth, et les navigateurs ne l'autorisent qu'en HTTPS. NOMAD sert donc cette application en HTTPS, avec un certificat auto-signé (votre NOMAD n'ayant pas d'adresse web publique), que les navigateurs signalent la première fois. Pour passer outre, une seule fois :

1. Cliquez sur **Ouvrir** sur la carte MeshCore Web. Le navigateur affiche un message comme *« Votre connexion n'est pas privée »* ou *« Non sécurisé »*.
2. Cliquez sur **Paramètres avancés**, puis **Continuer vers (l'adresse de votre NOMAD)**. (Selon le navigateur : « Continuer » ou « Accepter le risque ».)
3. Vous arrivez dans MeshCore Web. Le navigateur retient votre choix sur cet appareil.

**Connecter votre radio :** utilisez **Chrome ou Edge**, qui gèrent le mieux l'USB et le Bluetooth dans le navigateur. Branchez la radio à l'ordinateur sur lequel vous naviguez (USB), ou gardez-la à proximité (Bluetooth), puis connectez-vous depuis l'application. La radio se connecte à **l'ordinateur que vous utilisez**, pas au NOMAD lui-même. Certains téléphones refusent les certificats auto-signés ; Chrome ou Edge sur ordinateur est le plus fiable.

**Vos données :** rien à configurer ni à stocker sur votre NOMAD. Les réglages de la radio sont sur la radio, et les préférences de l'application dans votre navigateur.

**Fonctionne hors ligne :** entièrement, c'est tout le principe de MeshCore. L'application est servie par votre NOMAD et parle à votre radio directement en USB ou Bluetooth, jamais par internet.

## Bibliothèque traduite {% #offline-translation %}

Lit la Bibliothèque d'information dans une autre langue. Ouvrez un article : une barre **Traduire cette page** apparaît en haut, avec un bouton par langue installée, plus **Original** pour revenir en arrière. Votre choix est conservé quand vous passez d'un article à l'autre. Pratique pour lire en français les ressources disponibles uniquement en anglais.

**Pourquoi pas l'assistant IA ?** L'assistant IA sait traduire, mais cette application est environ 1 600 fois plus rapide sur la même machine et n'a pas besoin de carte graphique : elle fonctionne sur tous les NOMAD. Elle respecte aussi mieux les noms propres : l'assistant IA traduira volontiers « Project NOMAD », celle-ci non.

**Choisir les langues :** français, espagnol et allemand sont installés par défaut. Pour changer, utilisez **Gérer > Modifier** et définissez `TRANSLATE_LANGS` avec une liste de codes de langue séparés par des virgules, par exemple `fr,en,es`. Chaque langue pèse environ 74 Mo ; les nouvelles se téléchargent au prochain redémarrage de l'application. Une quarantaine de langues sont disponibles, dont l'hindi, le bengali, le tamoul, le télougou, le vietnamien et l'indonésien. **Le chinois, le japonais, le coréen, l'arabe et le thaï ne sont pas disponibles**, faute de modèle compact pour ces langues.

**Le premier démarrage demande internet.** Les modèles de langue se téléchargent au premier lancement, comme pour l'installation de n'importe quelle application. Ensuite, tout est hors ligne. Si vous l'installez sans connexion, l'application démarre et la bibliothèque fonctionne, mais sans traduction tant qu'elle n'a pas pu récupérer les modèles.

**Ce qui n'est pas traduit :** les tableaux et infobox, le titre de la page dans l'onglet du navigateur, et les résultats de recherche de Kiwix. La recherche se fait aussi dans la langue d'origine : cherchez dans la langue de la ressource, puis traduisez l'article obtenu.

**Deux boutons de langue :** la barre d'outils de la bibliothèque a un globe qui change la langue des *menus* autour de la page. La barre ajoutée par cette application change celle de l'*article*. Ce sont deux choses différentes, malheureusement placées l'une près de l'autre.

**Fiabilité :** c'est une traduction automatique, et littérale. Très bien pour saisir le sens d'un article, mais prudence pour une formulation médicale ou de sécurité exacte, où le bon terme dans une autre langue n'est souvent pas la traduction littérale.

**Vos données :** les modèles de langue sont dans `storage/translate/models`. Rien de ce que vous lisez n'est stocké ni envoyé.

**Fonctionne hors ligne :** oui, une fois les modèles téléchargés.
