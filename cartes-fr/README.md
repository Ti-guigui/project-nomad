# Cartes France et outre-mer

NOMAD propose deux façons d'obtenir des cartes hors ligne de la France :

1. **Collections prêtes à télécharger** (assistant de configuration et page *Cartes*) — 25 fichiers `.pmtiles` déjà découpés, listés dans [`collections/maps.json`](../collections/maps.json) et hébergés dans la release GitHub [`cartes-fr`](https://github.com/Ti-guigui/project-nomad/releases/tag/cartes-fr) de ce dépôt.
2. **Extraction à la demande** (page *Cartes → Choisir des pays*) — NOMAD découpe lui-même la zone voulue dans la carte mondiale Protomaps. Le groupe **« France & Outre-mer »** y permet de choisir la métropole et chaque territoire séparément. Rien à héberger, mais l'extraction se fait sur votre machine.

## Régions disponibles

| Collection | Régions | Taille approx. |
|---|---|---|
| France – Nord & Île-de-France | Île-de-France, Hauts-de-France, Normandie, Grand Est | 1,7 Go |
| France – Ouest | Bretagne, Pays de la Loire, Centre-Val de Loire | 1,2 Go |
| France – Sud-Ouest | Nouvelle-Aquitaine, Occitanie | 1,6 Go |
| France – Centre-Est | Auvergne-Rhône-Alpes, Bourgogne-Franche-Comté | 1,5 Go |
| France – Sud-Est & Corse | Provence-Alpes-Côte d'Azur, Corse | 0,4 Go |
| Outre-mer – Antilles & Guyane | Guadeloupe, Martinique, Guyane, Saint-Martin, Saint-Barthélemy, Saint-Pierre-et-Miquelon | 76 Mo |
| Outre-mer – Océan Indien | La Réunion, Mayotte, TAAF | 47 Mo |
| Outre-mer – Pacifique | Nouvelle-Calédonie, Polynésie française, Wallis-et-Futuna | 37 Mo |

Les contours viennent de [Natural Earth](https://www.naturalearthdata.com/) (domaine public), élargis d'environ 11 km pour inclure le littoral. Ils se trouvent dans [`regions/`](regions/).

## Générer ou mettre à jour les cartes

Dans l'onglet **Actions** du dépôt, lancez **« Générer les cartes France et outre-mer »** en indiquant la version (format `AAAA-MM`). Le workflow :

1. crée la release `cartes-fr` si elle n'existe pas ;
2. extrait chaque région depuis la dernière carte mondiale Protomaps (zoom 0 à 15) ;
3. publie `<région>_<version>.pmtiles` dans la release et supprime les versions précédentes de cette région.

La première génération prend environ une heure. Si vous changez de version, mettez à jour `version`, `url` et `spec_version` dans `collections/maps.json` pour que les installations voient la nouvelle version.

Pour générer les cartes sur votre propre machine (nécessite [`pmtiles`](https://github.com/protomaps/go-pmtiles/releases), `curl` et `jq`) :

```bash
cartes-fr/generer.sh 2026-10 sortie/                 # toutes les régions
cartes-fr/generer.sh 2026-10 sortie/ reunion mayotte # seulement certaines
```

Les données cartographiques sont © les contributeurs [OpenStreetMap](https://www.openstreetmap.org/copyright), mises en forme par [Protomaps](https://protomaps.com).
