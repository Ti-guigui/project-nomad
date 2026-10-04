# Modules communautaires

Project NOMAD est livré avec une sélection d'outils et de contenus intégrés, mais la communauté a commencé à créer des modules qui enrichissent la plateforme avec des packs de contenus hors ligne spécialisés. Ce sont des projets tiers, non maintenus par l'équipe de NOMAD. Installez-les à votre discrétion, et signalez bogues et demandes au dépôt du module concerné.

Vous avez créé un module pour NOMAD ? Ouvrez une issue sur le [dépôt GitHub de Project NOMAD](https://github.com/Crosstalk-Solutions/project-nomad/issues/new) ou écrivez via le [formulaire de contact de projectnomad.us](https://www.projectnomad.us/contact) (en anglais) pour qu'il soit étudié pour cette page.

---

## Packs de contenus ZIM

Les packs ZIM ajoutent des ouvrages de référence hors ligne à votre bibliothèque Kiwix existante. Ils sont en général fournis avec un script `install.sh` qui télécharge les sources, construit un fichier ZIM avec `zimwriterfs` et l'enregistre dans votre conteneur Kiwix.

### Manuels de campagne de l'armée américaine (en anglais)

**Dépôt :** [github.com/jrsphoto/ZIM-military-field-manuals](https://github.com/jrsphoto/ZIM-military-field-manuals)

Environ 180 manuels de campagne de l'armée américaine, dans le domaine public : médecine de terrain, survie, secourisme au combat, lecture de cartes et plus. Le tout dans un ZIM consultable qui s'ajoute à votre bibliothèque Kiwix.

Le ZIM final pèse environ 2 Go. La construction télécharge environ 2 Go de PDF sources depuis archive.org.

### Archive des tutoriels W3Schools (en anglais)

**Dépôt :** [github.com/kennethbrewer3/ZIM-w3schools-offline](https://github.com/kennethbrewer3/ZIM-w3schools-offline)

Une copie hors ligne complète des tutoriels de programmation W3Schools : HTML, CSS, JavaScript, Python, SQL et plus. Idéal pour apprendre à coder, retrouver une syntaxe ou enseigner la programmation sans internet.

Le ZIM final pèse environ 700 Mo. La construction télécharge environ 6 Go de fichiers sources depuis un miroir GitHub.

---

## Installer un module communautaire

Chaque module a ses propres instructions, mais la plupart des packs ZIM suivent le même schéma :

1. Clonez le dépôt du module sur votre machine NOMAD via SSH.
2. Lisez le README pour connaître les dépendances de construction. La plupart demandent `git`, `python3`, `unzip` et `zim-tools`.
3. Lancez le script `install.sh` fourni avec l'option `--deploy`, en lui indiquant le chemin de votre bibliothèque Kiwix (`/opt/project-nomad/storage/zim`) et le nom de votre conteneur Kiwix (`nomad_kiwix_server`).
4. Le script construit le ZIM, le copie dans votre bibliothèque Kiwix, l'enregistre et redémarre le conteneur Kiwix.

Une fois le script terminé, le nouveau contenu apparaît dans votre Bibliothèque d'information au prochain chargement.

La première construction peut prendre de quelques minutes à plus d'une heure selon la taille du module et le processeur de votre machine.

---

## À propos de l'assistance

Ces modules sont créés et maintenus par la communauté. En cas de problème avec un script d'installation ou le contenu d'un ZIM, ouvrez une issue sur le dépôt du module plutôt que sur celui de Project NOMAD. L'équipe aide volontiers si le problème vient de NOMAD lui-même (par exemple si Kiwix ne détecte pas un nouveau ZIM après installation), mais ne peut pas maintenir ni prendre en charge des contenus tiers.
