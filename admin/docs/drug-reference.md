# Référentiel des médicaments

Le référentiel des médicaments est une base de données hors ligne et consultable des **notices de médicaments de la FDA** (l'agence américaine du médicament), c'est-à-dire les informations officielles qui accompagnent les médicaments avec ou sans ordonnance. Une fois installé, il permet de chercher un médicament par son nom, de partir d'une situation pour trouver les médicaments qui la traitent, et de comparer deux notices côte à côte, le tout sans connexion internet.

C'est un module facultatif : une installation neuve de NOMAD ne le contient pas tant que vous ne choisissez pas de l'installer, car les données sont volumineuses.

> **Il s'agit d'informations de santé, pas d'un avis médical.** Le référentiel affiche le texte des notices déposées par les fabricants auprès de la FDA et associe des situations à des médicaments sans ordonnance. Il ne remplace ni un médecin, ni un pharmacien, ni un infirmier. Suivez toujours les indications du produit que vous avez réellement en main et, en cas d'urgence, appelez le **15** ou le **112** si vous le pouvez.

> **Notices américaines, en anglais.** Les notices sont celles du marché américain : noms commerciaux, dosages et disponibilité peuvent différer de ceux des médicaments vendus en France. Pour les médicaments français, la [base de données publique des médicaments](https://base-donnees-publique.medicaments.gouv.fr/) fait référence (en ligne).

La première fois que vous ouvrez le référentiel dans un navigateur, cet avertissement s'affiche dans une fenêtre qu'il faut accepter pour accéder à la page. Cette acceptation est mémorisée par navigateur : un autre navigateur ou appareil l'affichera de nouveau.

---

## L'installer

Deux façons d'obtenir les données, qui aboutissent au même résultat.

**Depuis l'Explorateur de contenus**, dans une collection :

1. Depuis l'écran d'accueil, ouvrez l'**Explorateur de contenus**.
2. Choisissez la catégorie **Médecine & Secours**.
3. Sélectionnez le niveau **Standard**. Son contenu est listé sur la carte, dont le **Référentiel des médicaments FDA**.
4. Confirmez le téléchargement.

**Depuis la page du référentiel elle-même.** Ouvrez le **Référentiel des médicaments** depuis l'écran d'accueil. Si aucune donnée n'est installée, un encadré propose un bouton pour télécharger les données de la FDA, qui lance le même processus.

Dans les deux cas, l'installation se fait en deux étapes, en arrière-plan :

- **Téléchargement** — NOMAD récupère le jeu de notices openFDA, environ **1,7 Go** compressé, en plusieurs parties. Si la connexion coupe, il reprend là où il s'était arrêté.
- **Indexation** — NOMAD intègre ces notices dans une base de recherche hors ligne rapide. C'est l'étape la plus longue, et les données occupent alors environ **8 à 10 Go** sur le disque.

Inutile de rester devant : quittez la page, l'installation continue, et la recherche s'active d'elle-même à la fin de l'indexation. La page affiche l'avancement des deux étapes pendant qu'elles tournent.

---

## S'y retrouver

Tout se trouve derrière la tuile **Référentiel des médicaments** de l'écran d'accueil. Une fois les données installées, la page compte trois onglets.

### Recherche par médicament

Tapez un nom de médicament, commercial ou générique (en anglais), et NOMAD affiche les notices FDA correspondantes : indications, posologie, mises en garde et composition, directement tirées de la notice officielle du fabricant.

Les résultats sont **regroupés par principe actif** plutôt que listés en centaines de produits quasi identiques. Une recherche sur un antidouleur courant renvoie un groupe par principe actif au lieu de chaque marque de distributeur séparément, pour voir clairement entre quoi vous choisissez.

### Par situation

Partez du problème plutôt que du produit. Choisissez une ou plusieurs situations, comme une brûlure, de la fièvre ou une diarrhée, et NOMAD liste les médicaments dont la notice FDA les couvre.

Avec plusieurs situations, NOMAD cherche d'abord les médicaments qui les couvrent **toutes**, puis affiche les résultats de chaque situation séparément. Pratique quand on a plusieurs symptômes à la fois et qu'on cherche un seul produit, s'il existe.

### Données FDA

Indique l'origine des données et leur état : téléchargées, indexées, nombre de notices chargées. C'est aussi là que vous relancez un téléchargement ou une indexation si besoin.

---

## Comparer deux médicaments

Depuis la fiche d'un médicament, utilisez la comparaison des mises en garde pour afficher deux notices côte à côte.

Les sections « mises en garde » des deux fabricants sont alors placées l'une à côté de l'autre. Cela ne **calcule pas** les interactions médicamenteuses et n'indique pas si une association est sans danger. Savoir si deux médicaments peuvent être pris ensemble, c'est précisément la question à poser à un pharmacien ou un médecin.

---

## Rester à jour

Les notices de la FDA évoluent. Si vous avez activé les **mises à jour automatiques des contenus** (Paramètres → Mises à jour), NOMAD vérifie régulièrement si openFDA a publié un jeu de données plus récent et met à jour le référentiel de lui-même, comme pour vos autres contenus hors ligne.

Sans mises à jour automatiques, les données restent telles qu'à l'installation, ce qui convient très bien à un usage hors ligne. Vous pouvez toujours relancer le téléchargement depuis l'onglet **Données FDA** pour récupérer la dernière version.

---

## À propos du stockage

Le référentiel des médicaments est l'élément le plus volumineux de la collection Médecine & Secours → Standard. Prévoyez environ **8 à 10 Go** de disque après indexation, en plus du téléchargement de 1,7 Go.

Si l'espace est limité, l'Explorateur de contenus affiche la taille totale d'un niveau avant que vous ne vous engagiez.
