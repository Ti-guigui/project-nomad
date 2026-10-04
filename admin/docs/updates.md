# Garder NOMAD à jour

NOMAD fonctionne au mieux quand il est mis à jour tant que vous avez internet : il est ainsi prêt, avec les derniers logiciels et contenus, la prochaine fois que vous serez hors ligne. Cette page explique ce qui peut être mis à jour, comment le faire à la demande, et comment laisser NOMAD s'en charger automatiquement.

---

## Trois types de mises à jour

Trois éléments distincts peuvent être mis à jour, chacun réglable indépendamment :

1. **Le logiciel (le cœur)** — NOMAD lui-même : le Centre de commande, les nouvelles fonctions, les corrections et les améliorations de sécurité.
2. **Les applications** — celles du [Dépôt d'applications](/supply-depot) (Kiwix, l'assistant IA et toutes celles que vous avez ajoutées).
3. **Les contenus** — vos ressources hors ligne : Wikipédia et les autres bibliothèques Kiwix, ainsi que les régions de carte téléchargées.

Chacun peut être mis à jour à la demande ou automatiquement.

---

## Mettre à jour à la demande

Pour rechercher et installer les mises à jour vous-même :

1. Allez dans **[Paramètres → Rechercher des mises à jour](/settings/update)**.
2. Si une mise à jour du logiciel est disponible, cliquez pour l'installer. NOMAD télécharge la mise à jour et redémarre (en général 2 à 5 minutes).
3. Les applications se mettent à jour depuis leur carte dans le [Dépôt d'applications](/supply-depot), via **Gérer › Mettre à jour**.
4. Les contenus se gèrent depuis **Paramètres → Gestionnaire de contenus** et **Explorateur de contenus**, où vous pouvez télécharger les nouvelles versions des bibliothèques et des cartes installées.

Si une mise à jour du logiciel ou d'une application échoue, NOMAD est conçu pour s'en remettre proprement : la version précédente continue de tourner et votre serveur reste disponible.

> **Version française :** les mises à jour du logiciel sont recherchées dans les releases du dépôt [Ti-guigui/project-nomad](https://github.com/Ti-guigui/project-nomad). Tant qu'aucune release n'y est publiée, mettez à jour avec le script `sudo bash /opt/project-nomad/update_nomad.sh`, qui récupère la dernière image.

---

## Mises à jour automatiques

NOMAD peut se tenir à jour sans que vous ayez à y penser. **Les mises à jour automatiques sont désactivées par défaut** : rien ne se met à jour tout seul tant que vous ne les avez pas activées. Tout se règle dans **Paramètres → Mises à jour**.

Quelques principes valent pour les trois types :

- **Vous choisissez un créneau horaire.** Les mises à jour automatiques ne se font que pendant les heures choisies, pour ne jamais vous interrompre.
- **Les versions majeures ne sont jamais automatiques.** Seules les versions mineures et correctives s'installent seules ; un changement de version majeure attend toujours votre action.
- **Les vérifications de sécurité passent d'abord.** Avant toute installation, NOMAD vérifie qu'il y a assez d'espace disque et qu'aucune autre mise à jour, aucun téléchargement ni aucune installation n'est en cours.
- **Être hors ligne n'est pas un problème.** Si NOMAD ne peut pas joindre internet, il saute simplement ce tour et réessaie plus tard.

### Mises à jour automatiques du logiciel

À activer dans **Paramètres → Mises à jour**. NOMAD met alors à jour son cœur vers les nouvelles versions de la même version majeure, pendant votre créneau, après un **délai de carence** réglable (pour qu'une toute nouvelle version ait le temps de faire ses preuves). La même page affiche l'interrupteur, le créneau, le délai de carence et l'état en direct. Si les mises à jour échouent plusieurs fois pour une vraie raison, NOMAD désactive la fonction et vous prévient au lieu de réessayer indéfiniment.

### Mises à jour automatiques des applications

Elles s'activent à **deux niveaux** : un interrupteur général dans **Paramètres → Mises à jour**, *et* un interrupteur par application sur sa carte dans le [Dépôt d'applications](/supply-depot). Les deux doivent être activés pour qu'une application se mette à jour seule. Elles partagent le créneau et le délai de carence du cœur, n'installent que les versions mineures et correctives, et se mettent en pause pour une application qui échoue à répétition.

### Mises à jour automatiques des contenus

Les bibliothèques Wikipédia/ZIM et les régions de carte installées peuvent aussi se rafraîchir seules. Comme ces téléchargements sont volumineux (souvent plusieurs gigaoctets), ils ont leur **propre créneau nocturne** et une **limite de bande passante**, distincts de ceux du logiciel et des applications. NOMAD interroge directement les catalogues Kiwix et cartographiques, et quand une bibliothèque Wikipédia est remplacée par une version plus récente, il garde automatiquement la base de connaissances de l'IA synchronisée.

---

## Canal d'accès anticipé

Envie des nouveautés avant leur sortie stable ? Activez le **canal d'accès anticipé** sur la page [Rechercher des mises à jour](/settings/update) pour recevoir les versions candidates. Elles peuvent contenir quelques imperfections ; vous pouvez revenir au canal stable à tout moment.

---

## Avant de partir hors ligne

Quoi que vous choisissiez, la bonne habitude est simple : **mettez à jour tant que vous avez internet.** À la main ou automatiquement, assurez-vous que vos logiciels et contenus sont à jour avant de partir sans connexion. Une fois hors ligne, vous aurez les dernières versions synchronisées de tout.

**[Rechercher des mises à jour →](/settings/update)** · **[Voir les nouveautés de chaque version →](/docs/release-notes)**
