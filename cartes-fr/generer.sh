#!/usr/bin/env bash
# Génère les cartes .pmtiles de la France et de l'outre-mer à partir de la
# dernière carte mondiale Protomaps, une région à la fois.
#
# Usage : cartes-fr/generer.sh <version AAAA-MM> <dossier de sortie> [région...]
# Sans région, toutes celles de cartes-fr/regions/ sont générées.
set -euo pipefail

VERSION="${1:?version AAAA-MM manquante}"
SORTIE="${2:?dossier de sortie manquant}"
shift 2
DOSSIER="$(cd "$(dirname "$0")" && pwd)"

if [[ ! "$VERSION" =~ ^[0-9]{4}-[0-9]{2}$ ]]; then
  echo "La version doit être au format AAAA-MM (ex. 2026-10)" >&2
  exit 1
fi

if [ "$#" -eq 0 ]; then
  set -- $(cd "$DOSSIER/regions" && ls *.geojson | sed 's/\.geojson$//')
fi

CLE=$(curl -fsSL https://build-metadata.protomaps.dev/builds.json | jq -r '.[-1].key')
SOURCE="https://build.protomaps.com/$CLE"
echo "Source : $SOURCE"

mkdir -p "$SORTIE"
for REGION in "$@"; do
  echo "=== $REGION"
  pmtiles extract "$SOURCE" "$SORTIE/${REGION}_${VERSION}.pmtiles" \
    --region="$DOSSIER/regions/$REGION.geojson" \
    --maxzoom=15 \
    --download-threads=8
done
