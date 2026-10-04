# Référence de l'API

NOMAD expose une API REST pour toutes ses opérations. Tous les points d'accès sont sous `/api/` et renvoient du JSON.

---

## Référence interactive

La référence complète et toujours à jour est générée directement à partir des routes et des validateurs de l'application, et présentée dans une interface interactive [Scalar](https://scalar.com) :

- **[/reference](/reference)** — parcourez chaque point d'accès, les schémas de requête et de réponse, et testez les appels en direct
- **[/api/openapi.json](/api/openapi.json)** — le document OpenAPI 3.1 brut (à importer dans Postman, Insomnia, un générateur de code…)

Comme elle est tirée des mêmes validateurs VineJS que ceux utilisés par l'API, elle ne s'écarte jamais de l'implémentation. Préférez-la à toute liste écrite à la main.

---

## Conventions

**URL de base :** `http://<votre-serveur>/api`

**Réponses :**
- Les réponses réussies contiennent `{ "success": true }` avec un code HTTP 2xx
- Les erreurs renvoient le code HTTP approprié (400, 404, 409, 500) avec un message d'erreur
- Les opérations longues (téléchargements, bancs d'essai, vectorisations) renvoient 201 ou 202 avec un identifiant de tâche à interroger

**Fonctionnement asynchrone :** soumettre une tâche → recevoir un identifiant → interroger un point d'accès d'état jusqu'à la fin.
