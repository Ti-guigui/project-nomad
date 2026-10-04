# Foire aux questions (FAQ)

Les réponses aux questions les plus fréquentes sur Project NOMAD.

## Puis-je changer les ports utilisés par NOMAD ?

Oui, vous pouvez changer les ports des services principaux de NOMAD (Centre de commande, MySQL, Redis). Voir la section [Installation avancée](README.md#installation-avancée) du README.

Remarque : au 24/03/2026, seuls les services principaux définis dans le fichier `docker-compose.yml` permettent de changer les ports. Les applications installables (Ollama, Kiwix, etc.) ne le permettent pas encore, mais plusieurs contributions sont en cours pour l'ajouter à toutes les applications dans une prochaine version.

## Puis-je choisir où NOMAD stocke ses données ?

Oui, en modifiant le fichier `docker-compose.yml` pour faire pointer les montages (bind mounts) vers l'emplacement voulu sur la machine hôte. Voir la section [Installation avancée](README.md#installation-avancée) du README.

## Puis-je stocker les données de NOMAD sur un disque externe ou un stockage réseau ?

Réponse courte : oui, mais nous ne pouvons pas le faire à votre place (et nous recommandons un disque local pour de meilleures performances).

Réponse longue : chemins de stockage personnalisés, points de montage et disques externes (volumes iSCSI ou SMB/NFS par exemple) **sont possibles**, mais cela dépend de votre configuration de la machine hôte avant le démarrage de NOMAD, puis se transmet via le compose.yml : c'est une question *de la machine hôte*, pas de NOMAD (voir ci-dessus). NOMAD ne peut pas le configurer pour vous, et le script d'installation ne pourrait pas prendre en charge toutes les configurations possibles.

## Puis-je utiliser NOMAD sur Mac, WSL2 ou une distribution non Debian ?

**WSL2 sous Windows** est pris en charge par la communauté grâce au [guide d'installation WSL2](https://www.projectnomad.us/install/wsl2) (en anglais) : il décrit deux méthodes (Docker natif et Docker Desktop), les pièges connus et des mesures de performances comparant WSL2 à une installation directe.

**macOS et les autres distributions Linux non Debian** ne sont pas officiellement pris en charge. Voir [Pourquoi NOMAD exige-t-il un système basé sur Debian ?](#pourquoi-nomad-exige-t-il-un-système-basé-sur-debian-)

## Pourquoi NOMAD exige-t-il un système basé sur Debian ?

Project NOMAD est actuellement conçu pour les distributions Linux basées sur Debian (Ubuntu 26.04 LTS recommandé), car les scripts d'installation et la configuration Docker sont optimisés pour cet environnement. Il est techniquement possible de faire tourner les conteneurs Docker sur d'autres systèmes compatibles avec Docker, mais l'installation n'a été ni testée ni optimisée pour eux : une expérience fluide n'est donc pas garantie.

D'autres systèmes seront pris en charge à l'avenir, mais les ressources de développement d'un projet libre et gratuit étant limitées, l'équipe a dû se concentrer sur un nombre restreint de plateformes pour la première version. Debian a été choisi parce qu'il est très répandu, facile à installer et offre un environnement stable pour Docker.

Pour Windows, le [guide WSL2](https://www.projectnomad.us/install/wsl2) propose une solution soutenue par la communauté. Des membres de la communauté ont aussi publié des guides pour d'autres plateformes (macOS par exemple) sur le Discord et dans les [discussions GitHub](https://github.com/Crosstalk-Solutions/project-nomad/discussions) du projet d'origine. Gardez toutefois à l'esprit que sur un système non Debian, vous pourrez rencontrer des problèmes pour lesquels aucune aide ne pourra être fournie, et qu'il vous faudra davantage de compétences techniques pour les résoudre.

## Puis-je utiliser NOMAD sur un Raspberry Pi ou un autre appareil ARM ?
Project NOMAD est actuellement conçu pour l'architecture x86-64 ; il n'a pas encore été testé ni optimisé pour les appareils ARM comme le Raspberry Pi (et aucune image officielle ARM n'est publiée).

La prise en charge d'ARM est prévue, mais l'effort initial a porté sur le matériel x86-64, très répandu et compatible avec un grand nombre d'applications.

Des membres de la communauté ont publié leurs propres images compatibles ARM et des guides d'installation pour Raspberry Pi et autres appareils ARM sur le Discord et dans les [discussions GitHub](https://github.com/Crosstalk-Solutions/project-nomad/discussions), mais ils ne sont pas pris en charge officiellement.

## Quelle configuration matérielle faut-il pour NOMAD ?

Project NOMAD lui-même est léger et tourne même sur du matériel x86-64 modeste, mais ce sont les outils et ressources que vous installez qui déterminent la configuration nécessaire. Voir le [guide matériel](https://www.projectnomad.us/hardware) (en anglais) pour des recommandations à différents prix.

## NOMAD est-il disponible dans d'autres langues que l'anglais ?

Le projet d'origine n'existe qu'en anglais. **Cette version** traduit l'interface et la documentation en français, et ses catalogues proposent en priorité des contenus francophones (Wikipédia, Wikivoyage, Wiktionnaire, Vikidia, WikiMed, iFixit…) ainsi que des cartes de la France et de l'outre-mer. Certaines ressources sans équivalent français restent en anglais ; elles sont signalées par « (anglais) ».

## Avec quelles technologies NOMAD est-il construit ?

Project NOMAD repose sur plusieurs technologies :
- **Docker :** conteneurisation du Centre de commande et de ses dépendances
- **Node.js et TypeScript :** partie serveur du Centre de commande, avec le framework [AdonisJS](https://adonisjs.com/)
- **React :** interface du Centre de commande, avec [Vite](https://vitejs.dev/) et [Inertia.js](https://inertiajs.com/)
- **MySQL :** base de données du Centre de commande
- **Redis :** cache, tâches de fond, tâches planifiées et autres processus internes

NOMAD utilise le modèle « Docker-outside-of-Docker » (DooD) : le Centre de commande pilote les autres conteneurs Docker de la machine hôte sans faire tourner Docker à l'intérieur d'un conteneur. Cette approche offre de meilleures performances et une meilleure compatibilité, tout en permettant de gérer les conteneurs depuis l'interface.

## Puis-je utiliser NOMAD si j'ai déjà des conteneurs Docker sur ma machine ?
Oui. NOMAD cohabite avec vos autres conteneurs Docker et n'interfère pas avec eux tant qu'il n'y a pas de conflit de ports ou de manque de ressources.

Tous les conteneurs de NOMAD ont un nom commençant par `nomad_`, ce qui permet de les repérer facilement. Vérifiez simplement les ports utilisés par les services principaux (Centre de commande, MySQL, Redis) pendant l'installation et changez-les si besoin.

## Pourquoi NOMAD a-t-il besoin d'accéder au socket Docker ?

Voir [Avec quelles technologies NOMAD est-il construit ?](#avec-quelles-technologies-nomad-est-il-construit-)

## Puis-je utiliser n'importe quel modèle d'IA ?
Par défaut, NOMAD utilise Ollama dans un conteneur Docker pour faire tourner les modèles de l'assistant IA. Un modèle trouvé sur HuggingFace, par exemple, ne pourra donc pas forcément être utilisé. La liste des modèles proposés dans les paramètres de l'assistant IA (/settings/models) ne contient pas forcément tous les modèles existants. Si vous avez trouvé sur https://ollama.com/search un modèle absent de la liste, vous pouvez le télécharger avec une commande curl :
`curl -X POST -H "Content-Type: application/json" -d '{"model":"NOM_DU_MODELE"}' http://localhost:8080/api/ollama/models` en remplaçant NOM_DU_MODELE par le nom indiqué sur le site d'Ollama.

Pour des réponses en français, privilégiez les modèles multilingues (par exemple les familles Mistral, Qwen ou Llama récentes).

## Dois-je installer les fonctions d'IA ?

Non. Les fonctions d'IA (Ollama, Qdrant, chaîne RAG, etc.) sont toutes facultatives et ne sont pas nécessaires pour utiliser le reste de NOMAD.

## NOMAD est-il vraiment gratuit ? Y a-t-il des coûts cachés ?
Oui, Project NOMAD est un logiciel entièrement libre et gratuit, sous licence Apache 2.0. Son utilisation n'entraîne aucun coût caché, et aucune fonction « premium » ni offre payante n'est prévue.

En dehors du matériel sur lequel vous l'installez, NOMAD ne coûte rien.

## Vendez-vous du matériel ou des appareils avec NOMAD préinstallé ?

Non. Project NOMAD est un logiciel libre ; des instructions d'installation détaillées et des recommandations matérielles permettent à chacun de monter sa propre machine. Cette approche « faites-le vous-même » demande un peu de temps et de savoir-faire, mais offre plus de liberté pour choisir et configurer le matériel selon vos besoins, votre budget et vos préférences.

## En combien de temps les problèmes signalés sont-ils corrigés ?

L'équipe du projet d'origine fait au mieux, mais Project NOMAD est un projet libre maintenu par une petite équipe de bénévoles. Les problèmes sont traités selon leur gravité, leur impact et le travail nécessaire. Les problèmes critiques touchant beaucoup d'utilisateurs passent en priorité. Chaque correctif est aussi testé pour éviter d'introduire de nouveaux problèmes, ce qui prend du temps.

Pour les problèmes propres à cette version française (traduction, contenus français, cartes), ouvrez une issue sur [ce dépôt](https://github.com/Ti-guigui/project-nomad/issues). Pour le reste, consultez le Discord et les discussions GitHub du projet d'origine.

## À quelle fréquence sortent les nouvelles fonctions et mises à jour ?

Le projet d'origine publie régulièrement des mises à jour, à un rythme qui dépend de la complexité des fonctions, des ressources de l'équipe et des retours de la communauté. Les petites versions correctives sortent plus souvent que les grandes versions de fonctionnalités.

## J'ai une question qui n'est pas traitée ici. Où demander de l'aide ?

Sur le Discord (https://discord.com/invite/crosstalksolutions, en anglais) ou dans les discussions GitHub du projet d'origine (https://github.com/Crosstalk-Solutions/project-nomad/discussions). Pour la version française, ouvrez une issue sur [ce dépôt](https://github.com/Ti-guigui/project-nomad/issues).

## J'ai une idée de fonction ou d'amélioration. Comment la proposer ?

Partagez votre idée (ou votez pour une idée existante) sur la feuille de route publique du projet d'origine : https://roadmap.projectnomad.us. C'est le meilleur moyen d'être vu par l'équipe de développement et la communauté.
