/**
 * Version française : traduction à l'affichage des messages produits par le serveur
 * (raisons des mises à jour automatiques, résumés d'exécution, réponses de l'API…).
 *
 * Le serveur continue d'écrire ses messages en anglais : ils sont vérifiés par les
 * tests et partagés avec le projet d'origine. On les traduit ici, au dernier moment,
 * avec une table de motifs. Un message inconnu est renvoyé tel quel.
 */

type Regle = [RegExp, string | ((...groupes: string[]) => string)]

const REGLES: Regle[] = [
  [/^Up to date$/i, 'À jour'],
  [/^Auto-update disabled after repeated failures$/i, 'Mise à jour automatique désactivée après plusieurs échecs'],
  [
    /^(Content auto-update|Auto-update) disabled after (\d+) consecutive failures\.?\s*(?:Last error: )?(.*)$/is,
    (_, quoi, n, erreur) =>
      `${quoi.startsWith('Content') ? 'Mise à jour automatique des contenus' : 'Mise à jour automatique'} désactivée après ${n} échecs consécutifs.` +
      (erreur ? ` Dernière erreur : ${traduireMessageServeur(erreur)}` : ''),
  ],
  [/^Pinned to :latest — cannot version-check$/i, 'Épinglée sur :latest — impossible de suivre les versions'],
  [/^Major version — manual update required$/i, 'Version majeure — mise à jour manuelle requise'],
  [/^Cool-off pending$/i, 'Délai de carence en attente'],
  [/^In cool-off \((\d+)h remaining\)$/i, (_, h) => `En période de carence (encore ${h} h)`],
  [/^Eligible → (.+)$/, (_, v) => `Éligible → ${v}`],
  [/^(\d+) download\(s\) in progress$/i, (_, n) => `${n} téléchargement(s) en cours`],
  [/^(\d+) app install\/update\(s\) in progress$/i, (_, n) => `${n} installation(s) ou mise(s) à jour d'application en cours`],
  [/^App has an operation in progress \(status: (.+)\)$/i, (_, s) => `Une opération est en cours sur l'application (état : ${s})`],
  [/^App auto-update is disabled$/i, 'La mise à jour automatique des applications est désactivée'],
  [/^Content auto-update is disabled$/i, 'La mise à jour automatique des contenus est désactivée'],
  [/^Auto-update is disabled$/i, 'La mise à jour automatique est désactivée'],
  [/^Outside update window \((.+)\)$/i, (_, f) => `Hors du créneau de mise à jour (${f})`],
  [/^No eligible app updates \(all current, in cool-off, or major-only\)$/i, "Aucune mise à jour d'application éligible (toutes à jour, en période de carence ou versions majeures uniquement)"],
  [/^No eligible content updates$/i, 'Aucune mise à jour de contenu éligible'],
  [/^No eligible minor\/patch update available \(or still in cool-off\)$/i, 'Aucune mise à jour mineure ou corrective éligible (ou encore en période de carence)'],
  [/^Failed to determine eligible version: (.+)$/i, (_, e) => `Impossible de déterminer la version éligible : ${e}`],
  [/^Pre-flight blocked: (.+)$/i, (_, liste) => `Bloqué par les vérifications préalables : ${liste.split('; ').map(traduireMessageServeur).join(' ; ')}`],
  [/^Ready to update to (.+)$/i, (_, v) => `Prêt à mettre à jour vers ${v}`],
  [/^Update requested: (.+)$/i, (_, v) => `Mise à jour demandée : ${v}`],
  [/^Update sidecar is not available$/i, "Le service de mise à jour (sidecar) n'est pas disponible"],
  [/^A system update is already in progress \(stage: (.+)\)$/i, (_, e) => `Une mise à jour du système est déjà en cours (étape : ${e})`],
  [/^(\d+) updated, (\d+) failed, (\d+) skipped$/i, (_, a, b, c) => `${a} mise(s) à jour, ${b} échec(s), ${c} ignorée(s)`],
  [/^Failed: (.+)$/is, (_, e) => `Échec : ${e}`],
  [/^drug dataset: (.+)$/is, (_, r) => `référentiel des médicaments : ${traduireMessageServeur(r)}`],
  [/^drug dataset check failed: (.+)$/is, (_, e) => `échec de la vérification du référentiel des médicaments : ${e}`],
]

// Réponses de l'API (messages de succès et d'erreur renvoyés par les contrôleurs).
// Les motifs les plus précis passent avant les plus généraux.
const REGLES_API: Regle[] = [
  // Services et applications
  [/^Service (.+) not found or not installed$/, (_, n) => `Service ${n} introuvable ou non installé`],
  [/^Service (.+) installation is already in progress$/, (_, n) => `L'installation du service ${n} est déjà en cours`],
  [/^Service (.+) installation initiated successfully\..*$/s, (_, n) => `Installation du service ${n} lancée`],
  [/^Service (.+) force reinstall initiated successfully\..*$/s, (_, n) => `Réinstallation forcée du service ${n} lancée`],
  [/^Service (.+) container removed successfully$/, (_, n) => `Conteneur du service ${n} supprimé`],
  [/^Service (.+) already has an update in progress$/, (_, n) => `Une mise à jour du service ${n} est déjà en cours`],
  [/^Service (.+) already has an operation in progress$/, (_, n) => `Une opération est déjà en cours sur le service ${n}`],
  [/^Service (.+) updated to (.+)$/, (_, n, v) => `Service ${n} mis à jour vers ${v}`],
  [/^Service (.+) uninstalled$/, (_, n) => `Service ${n} désinstallé`],
  [/^Service (.+) stopped successfully$/, (_, n) => `Service ${n} arrêté`],
  [/^Service (.+) started successfully$/, (_, n) => `Service ${n} démarré`],
  [/^Service (.+) restarted successfully$/, (_, n) => `Service ${n} redémarré`],
  [/^Service (.+) reconfigured successfully$/, (_, n) => `Service ${n} reconfiguré`],
  [/^Service (.+) is not installed$/, (_, n) => `Le service ${n} n'est pas installé`],
  [/^Service (.+) is already running$/, (_, n) => `Le service ${n} est déjà en cours d'exécution`],
  [/^Service (.+) is already installed$/, (_, n) => `Le service ${n} est déjà installé`],
  [/^Service (.+) not found$/, (_, n) => `Service ${n} introuvable`],
  [/^Service update check dispatched$/, 'Recherche de mises à jour des services lancée'],
  [/^No container found for (.+)$/, (_, n) => `Aucun conteneur trouvé pour ${n}`],
  [/^Container for service (.+) not found$/, (_, n) => `Conteneur du service ${n} introuvable`],
  [/^Container for (.+) not found$/, (_, n) => `Conteneur de ${n} introuvable`],
  [/^Container (.+) removed$/, (_, n) => `Conteneur ${n} supprimé`],
  [/^Failed to remove service (.+) container\..*$/s, (_, n) => `Impossible de supprimer le conteneur du service ${n}. Consultez les journaux du serveur.`],
  [/^Failed to remove existing container for service (.+?): (.*)$/s, (_, n, e) => `Impossible de supprimer le conteneur existant du service ${n} : ${e}`],
  [/^Failed to force reinstall service (.+)\. Check server logs for details\.$/, (_, n) => `Échec de la réinstallation forcée du service ${n}. Consultez les journaux du serveur.`],
  [/^Failed to (start|stop|restart) service (.+)\. Check server logs for details\.$/, (_, a, n) =>
    `Échec ${({ start: 'du démarrage', stop: "de l'arrêt", restart: 'du redémarrage' } as Record<string, string>)[a]} du service ${n}. Consultez les journaux du serveur.`],
  [/^Invalid action: (.+?)\..*$/s, (_, a) => `Action non valide : ${a}. Utilisez « start », « stop » ou « restart ».`],
  [/^Update failed: new container did not stay running\..*$/s, "Échec de la mise à jour : le nouveau conteneur ne reste pas démarré. Retour à la version précédente."],
  [/^Update failed: new container did not start \((.*)\)\..*$/s, (_, e) => `Échec de la mise à jour : le nouveau conteneur n'a pas démarré (${e}). Retour à la version précédente.`],
  [/^Reconfigure failed and was rolled back: (.*)$/s, (_, e) => `Échec de la reconfiguration, modifications annulées : ${e}`],
  [/^Dependency services cannot be uninstalled directly\.$/, 'Les services dépendants ne peuvent pas être désinstallés directement.'],
  [/^This service cannot be edited\.$/, 'Ce service ne peut pas être modifié.'],
  [/^This service cannot be configured\.$/, 'Ce service ne peut pas être configuré.'],
  [/^Already installed$/, 'Déjà installé'],
  [/^Failed to affect service$/, "Échec de l'opération sur le service"],
  [/^Failed to force reinstall service$/, 'Échec de la réinstallation forcée du service'],
  [/^Failed to fetch available versions for this service\.$/, 'Impossible de récupérer les versions disponibles pour ce service.'],

  // Applications personnalisées et liens
  [/^A custom app named "(.+)" already exists\..*$/s, (_, n) => `Une application nommée « ${n} » existe déjà. Choisissez un autre nom.`],
  [/^A link named "(.+)" already exists\..*$/s, (_, n) => `Un lien nommé « ${n} » existe déjà. Choisissez un autre nom.`],
  [/^Duplicate host port\(s\): (.+?)\..*$/s, (_, p) => `Port(s) hôte en double : ${p}. Chaque port hôte ne peut être associé qu'à un seul conteneur.`],
  [/^Custom app (.+) deleted$/, (_, n) => `Application personnalisée ${n} supprimée`],
  [/^Only custom apps can be updated this way\.$/, 'Seules les applications personnalisées peuvent être mises à jour de cette façon.'],
  [/^Only custom apps can be deleted\.$/, 'Seules les applications personnalisées peuvent être supprimées.'],
  [/^Custom apps are removed via delete\.$/, 'Les applications personnalisées se retirent avec « Supprimer ».'],
  [/^Custom URL must be a valid http\(s\) address.*$/s, 'L\'adresse personnalisée doit être une adresse http(s) valide (ex. https://jellyfin.maison.net).'],
  [/^Enter a valid URL, for example .*$/s, 'Saisissez une adresse valide, par exemple 192.168.1.50:8080 ou https://nas.local.'],
  [/^Enter a name using letters or numbers\.$/, 'Saisissez un nom composé de lettres ou de chiffres.'],
  [/^That app is not a link\.$/, "Cette application n'est pas un lien."],
  [/^Link not found$/, 'Lien introuvable'],
  [/^Unknown icon\.$/, 'Icône inconnue.'],
  [/^Invalid URL\.$/, 'Adresse non valide.'],

  // Mise à jour du système
  [/^Update already in progress \(stage: (.+)\)$/, (_, e) => `Mise à jour déjà en cours (étape : ${e})`],
  [/^Update sidecar is not available\..*$/s, "Le service de mise à jour (sidecar) n'est pas disponible. Vérifiez que le conteneur « updater » est démarré."],
  [/^System update initiated\..*$/s, 'Mise à jour du système lancée. Le conteneur principal va redémarrer pendant l\'opération.'],
  [/^Failed to request system update\..*$/s, 'Impossible de demander la mise à jour du système. Consultez les journaux du serveur.'],
  [/^No update in progress$/, 'Aucune mise à jour en cours'],
  [/^Failed to check latest version: (.*)$/s, (_, e) => `Impossible de vérifier la dernière version : ${e}`],
  [/^Unknown error during update check$/, 'Erreur inconnue pendant la recherche de mises à jour'],
  [/^Failed to retrieve update status$/, "Impossible de récupérer l'état de la mise à jour"],
  [/^Failed to retrieve content auto-update status$/, "Impossible de récupérer l'état de la mise à jour automatique des contenus"],
  [/^Failed to retrieve app auto-update status$/, "Impossible de récupérer l'état de la mise à jour automatique des applications"],
  [/^Failed to retrieve auto-update status$/, "Impossible de récupérer l'état de la mise à jour automatique"],
  [/^App auto-update preference updated$/, 'Préférence de mise à jour automatique des applications enregistrée'],
  [/^Failed to check for content updates\..*$/s, 'Impossible de rechercher les mises à jour des contenus. Réessayez plus tard.'],
  [/^Setting updated successfully$/, 'Réglage enregistré'],
  [/^Successfully subscribed to release notes$/, 'Inscription aux notes de version enregistrée'],
  [/^Failed to subscribe: (.*)$/s, (_, e) => `Échec de l'inscription : ${e}`],

  // Téléchargements, cartes, ZIM
  [/^Download started successfully$/, 'Téléchargement lancé'],
  [/^Download started$/, 'Téléchargement lancé'],
  [/^Download cancelled and partial file deleted$/, 'Téléchargement annulé, fichier partiel supprimé'],
  [/^Download cancelled$/, 'Téléchargement annulé'],
  [/^Download already in progress for model (.+)$/, (_, m) => `Téléchargement déjà en cours pour le modèle ${m}`],
  [/^Download already in progress$/, 'Téléchargement déjà en cours'],
  [/^A download is already in progress for (.+)$/, (_, r) => `Un téléchargement est déjà en cours pour ${r}`],
  [/^Collection download started successfully$/, 'Téléchargement de la collection lancé'],
  [/^Dispatched download job for URL (.+)$/, (_, u) => `Téléchargement lancé pour ${u}`],
  [/^Dispatched model download job for (.+)$/, (_, m) => `Téléchargement du modèle ${m} lancé`],
  [/^Job already exists for URL (.+)$/, (_, u) => `Un téléchargement existe déjà pour ${u}`],
  [/^Job already exists for model (.+)$/, (_, m) => `Un téléchargement existe déjà pour le modèle ${m}`],
  [/^Retrying download for model (.+)$/, (_, m) => `Nouvelle tentative de téléchargement du modèle ${m}`],
  [/^Retrying download for (.+)$/, (_, u) => `Nouvelle tentative de téléchargement de ${u}`],
  [/^Cannot retry: model name not found in job data$/, 'Nouvelle tentative impossible : nom du modèle absent de la tâche'],
  [/^Cannot retry: missing URL or filepath in job data$/, 'Nouvelle tentative impossible : adresse ou chemin absent de la tâche'],
  [/^Failed to dispatch download job$/, 'Impossible de lancer le téléchargement'],
  [/^Failed job not found\..*$/s, 'Tâche en échec introuvable. Elle a peut-être déjà été retirée.'],
  [/^Job not found \(may have already completed\)$/, 'Tâche introuvable (elle est peut-être déjà terminée)'],
  [/^Preflight check failed\..*$/s, "La vérification préalable a échoué. Vérifiez que l'adresse est valide et accessible."],
  [/^Could not fetch directory listing from the provided URL$/, "Impossible de lire le contenu du dossier à l'adresse indiquée"],
  [/^Dispatched pmtiles extract job$/, 'Extraction de la carte lancée'],
  [/^Extract job already exists for these params$/, 'Une extraction identique est déjà en cours'],
  [/^Extract started successfully$/, 'Extraction lancée'],
  [/^Extract cancelled and partial file deleted$/, 'Extraction annulée, fichier partiel supprimé'],
  [/^Map file with key (.+) not found$/, (_, f) => `Fichier de carte ${f} introuvable`],
  [/^Map file deleted successfully$/, 'Fichier de carte supprimé'],
  [/^Marker not found$/, 'Repère introuvable'],
  [/^Marker deleted$/, 'Repère supprimé'],
  [/^ZIM file with key (.+) not found$/, (_, f) => `Fichier ZIM ${f} introuvable`],
  [/^ZIM file uploaded and registered successfully$/, 'Fichier ZIM envoyé et ajouté à la bibliothèque'],
  [/^ZIM file deleted successfully$/, 'Fichier ZIM supprimé'],
  [/^A ZIM file with that name already exists$/, 'Un fichier ZIM porte déjà ce nom'],
  [/^Only \.zim files are accepted$/, 'Seuls les fichiers .zim sont acceptés'],
  [/^Wikipedia removed$/, 'Wikipédia supprimé'],
  [/^Custom library removed$/, 'Bibliothèque personnalisée supprimée'],
  [/^Custom library added$/, 'Bibliothèque personnalisée ajoutée'],
  [/^Kiwix migrated to library mode successfully\.$/, 'Kiwix est passé en mode bibliothèque.'],
  [/^Kiwix library rescanned$/, 'Bibliothèque Kiwix réanalysée'],
  [/^Invalid filename$/, 'Nom de fichier non valide'],
  [/^Invalid collection names\.$/, 'Noms de collections non valides.'],
  [/^Invalid collection name\.$/, 'Nom de collection non valide.'],
  [/^No file uploaded$/, "Aucun fichier n'a été envoyé"],
  [/^No file received$/, "Aucun fichier n'a été reçu"],
  [/^Upload failed$/, "Échec de l'envoi"],
  [/^Unsupported file type\.$/, 'Type de fichier non pris en charge.'],
  [/^Failed to read the uploaded file\.$/, 'Impossible de lire le fichier envoyé.'],
  [/^File not found or not viewable$/, 'Fichier introuvable ou impossible à afficher'],
  [/^File not found$/, 'Fichier introuvable'],

  // Packs de créateurs
  [/^Creator pack not found: (.+)$/, (_, p) => `Pack de créateur introuvable : ${p}`],
  [/^Creator pack is not installed: (.+)$/, (_, p) => `Pack de créateur non installé : ${p}`],
  [/^Creator Packs are not configured on this server$/, 'Les packs de créateurs ne sont pas configurés sur ce serveur'],
  [/^Failed to load creator packs$/, 'Impossible de charger les packs de créateurs'],
  [/^Pack is already installed$/, 'Ce pack est déjà installé'],
  [/^Pack download is already in progress$/, 'Le téléchargement de ce pack est déjà en cours'],
  [/^Pack download started$/, 'Téléchargement du pack lancé'],
  [/^Pack uninstalled$/, 'Pack désinstallé'],

  // Assistant IA et modèles
  [/^AI Assistant service not installed$/, "L'assistant IA n'est pas installé"],
  [/^AI service is not initialized\.$/, "Le service d'IA n'est pas initialisé."],
  [/^Ollama service record not found\.$/, 'Service Ollama introuvable.'],
  [/^Remote Ollama configured\.$/, 'Serveur Ollama distant configuré.'],
  [/^Could not connect to (\S+) \(HTTP (\d+)\)\..*$/s, (_, u, c) => `Connexion impossible à ${u} (HTTP ${c}). Vérifiez que le serveur est démarré et accessible. Pour Ollama, lancez-le avec OLLAMA_HOST=0.0.0.0.`],
  [/^Could not connect to (\S+)\. .*$/s, (_, u) => `Connexion impossible à ${u}. Vérifiez que le serveur est démarré et joignable. Pour Ollama, lancez-le avec OLLAMA_HOST=0.0.0.0.`],
  [/^Model "(.+)" is not available in your AI host\..*$/s, (_, m) => `Le modèle « ${m} » n'est pas disponible sur votre serveur d'IA. Chargez-le manuellement (le téléchargement de modèles n'est possible qu'avec Ollama).`],
  [/^Model "(.+)" deleted\.$/, (_, m) => `Modèle « ${m} » supprimé.`],
  [/^Model deleted: (.+)$/, (_, m) => `Modèle supprimé : ${m}`],
  [/^The selected model "(.+)" does not support image input\.$/, (_, m) => `Le modèle choisi « ${m} » ne prend pas en charge les images.`],
  [/^Download job dispatched for model: (.+)$/, (_, m) => `Téléchargement lancé pour le modèle : ${m}`],
  [/^Model is already installed\.$/, 'Ce modèle est déjà installé.'],
  [/^Model downloaded successfully\.$/, 'Modèle téléchargé.'],
  [/^Model download cancelled$/, 'Téléchargement du modèle annulé'],
  [/^Failed to queue model download\..*$/s, 'Impossible de lancer le téléchargement du modèle. Réessayez.'],
  [/^Failed to delete model\..*$/s, "Impossible de supprimer le modèle. Le serveur d'IA n'est peut-être pas Ollama."],
  [/^Images require a user message\.$/, 'Les images doivent accompagner un message.'],
  [/^Multipart chat requests require a JSON payload\.$/, 'Les requêtes de discussion avec fichiers doivent contenir des données JSON.'],
  [/^The multipart chat payload is not valid JSON\.$/, "Les données de la discussion ne sont pas un JSON valide."],

  // Discussions
  [/^Session not found$/, 'Conversation introuvable'],
  [/^Failed to create session$/, 'Impossible de créer la conversation'],
  [/^Failed to update session$/, 'Impossible de modifier la conversation'],
  [/^Failed to delete session$/, 'Impossible de supprimer la conversation'],
  [/^Failed to delete all sessions$/, 'Impossible de supprimer toutes les conversations'],
  [/^All chat sessions deleted$/, 'Toutes les conversations ont été supprimées'],
  [/^Failed to add message$/, "Impossible d'ajouter le message"],
  [/^Failed to get suggestions$/, 'Impossible de récupérer les suggestions'],

  // Base de connaissances
  [/^File queued for embedding: (.+)$/, (_, f) => `Fichier mis en file d'indexation : ${f}`],
  [/^Embedding job already exists for: (.+)$/, (_, f) => `Une indexation est déjà prévue pour : ${f}`],
  [/^Successfully embedded (\d+) chunks$/, (_, n) => `${n} extraits indexés`],
  [/^Batch embedded (\d+) chunks, next batch queued$/, (_, n) => `${n} extraits indexés, lot suivant en file d'attente`],
  [/^Scanned (\d+) files, queued (\d+) for embedding(.*)$/s, (_, a, b, reste) => `${a} fichiers analysés, ${b} mis en file d'indexation${reste}`],
  [/^Knowledge base is already in sync(.*)$/s, (_, reste) => `La base de connaissances est déjà à jour${reste}`],
  [/^Cleaned up (\d+) failed jobs?(?:, deleted (\d+) files?)?\.$/, (_, n, f) => `${n} tâche(s) en échec nettoyée(s)${f ? `, ${f} fichier(s) supprimé(s)` : ''}.`],
  [/^Cancelled (\d+) jobs?(?:, deleted (\d+) files?)?\.$/, (_, n, f) => `${n} tâche(s) annulée(s)${f ? `, ${f} fichier(s) supprimé(s)` : ''}.`],
  [/^Renamed "(.+)" to "(.+)"\.$/, (_, a, b) => `« ${a} » renommé en « ${b} ».`],
  [/^Nomad docs discovery completed\. Dispatched (\d+) embedding jobs\.$/, (_, n) => `Documentation NOMAD analysée : ${n} indexation(s) lancée(s).`],
  [/^Nomad docs have already been discovered and queued\. Skipping\.$/, 'La documentation NOMAD est déjà en file d\'indexation.'],
  [/^Process completed succesfully, but no text was found to embed\.$/, "Traitement terminé, mais aucun texte n'a été trouvé à indexer."],
  [/^File processed and embedded successfully\.$/, 'Fichier traité et indexé.'],
  [/^File removed from knowledge base\.$/, 'Fichier retiré de la base de connaissances.'],
  [/^File is not a tracked knowledge-base source\.$/, "Ce fichier ne fait pas partie de la base de connaissances."],
  [/^Job not found for this file$/, 'Aucune tâche trouvée pour ce fichier'],
  [/^Embedding input exceeds the model context length$/, 'Le texte à indexer dépasse la taille de contexte du modèle'],
  [/^Failed to embed and store the extracted text\.$/, "Impossible d'indexer et d'enregistrer le texte extrait."],
  [/^Failed to dispatch embed job for this file\.$/, "Impossible de lancer l'indexation de ce fichier."],
  [/^Failed to clear prior embeddings before re-embed\.$/, "Impossible d'effacer l'ancienne indexation avant de réindexer."],
  [/^Error updating file collection\.$/, 'Erreur lors du changement de collection du fichier.'],
  [/^Error updating file active state\.$/, "Erreur lors de l'activation ou la désactivation du fichier."],
  [/^Error updating collection active state\.$/, "Erreur lors de l'activation ou la désactivation de la collection."],
  [/^Error scanning and syncing storage$/, "Erreur lors de l'analyse et de la synchronisation du stockage"],
  [/^Error scanning and syncing knowledge base$/, "Erreur lors de l'analyse et de la synchronisation de la base de connaissances"],
  [/^Error renaming collection\.$/, 'Erreur lors du renommage de la collection.'],
  [/^Error processing and embedding file\.$/, "Erreur lors du traitement et de l'indexation du fichier."],
  [/^Error during reset (?:and|&) rebuild$/, 'Erreur lors de la réinitialisation et de la reconstruction'],
  [/^Error during re-embed all$/, 'Erreur lors de la réindexation complète'],
  [/^Error during re-embed$/, 'Erreur lors de la réindexation'],
  [/^Error discovering Nomad docs\.$/, "Erreur lors de l'analyse de la documentation NOMAD."],
  [/^Error deleting file from knowledge base\.$/, 'Erreur lors de la suppression du fichier de la base de connaissances.'],
  [/^Error deleting collection\.$/, 'Erreur lors de la suppression de la collection.'],

  // Référentiel des médicaments et situations
  [/^Drug label not found$/, 'Notice de médicament introuvable'],
  [/^Drug label ingest already running$/, "L'import des notices est déjà en cours"],
  [/^Drug label ingest dispatched$/, 'Import des notices lancé'],
  [/^Drug data download already running$/, 'Le téléchargement du référentiel des médicaments est déjà en cours'],
  [/^Drug data download dispatched$/, 'Téléchargement du référentiel des médicaments lancé'],
  [/^Drug data download cancelled$/, 'Téléchargement du référentiel des médicaments annulé'],
  [/^Could not cancel drug data download: (.*)$/s, (_, e) => `Impossible d'annuler le téléchargement du référentiel des médicaments : ${e}`],
  [/^Could not uninstall drug reference$/, 'Impossible de désinstaller le référentiel des médicaments'],
  [/^Could not trigger ingest$/, "Impossible de lancer l'import"],
  [/^Could not trigger download$/, 'Impossible de lancer le téléchargement'],
  [/^Could not reset ingest$/, "Impossible de réinitialiser l'import"],
  [/^Could not read ingest status$/, "Impossible de lire l'état de l'import"],
  [/^Could not load drug label$/, 'Impossible de charger la notice'],
  [/^Could not load condition$/, 'Impossible de charger la situation'],
  [/^Condition not found$/, 'Situation introuvable'],
  [/^Provide either slug or q, not both$/, 'Indiquez soit « slug », soit « q », pas les deux'],
  [/^Provide a slug or q query parameter$/, 'Indiquez un paramètre « slug » ou « q »'],

  // Banc d'essai
  [/^Benchmark job (.+) dispatched successfully$/, (_, id) => `Banc d'essai ${id} lancé`],
  [/^Benchmark job (.+) already exists$/, (_, id) => `Le banc d'essai ${id} existe déjà`],
  [/^Benchmark result not found$/, "Résultat du banc d'essai introuvable"],
  [/^System benchmark started$/, "Banc d'essai du système lancé"],
  [/^AI benchmark started$/, "Banc d'essai de l'IA lancé"],
  [/^An internal error occurred while running the benchmark\.$/, "Une erreur interne est survenue pendant le banc d'essai."],
  [/^Invalid builder tag format\..*$/s, 'Format du badge de constructeur non valide. Attendu : Mot-Mot-0000'],

  // Divers
  [/^NOMAD\.md saved successfully$/, 'NOMAD.md enregistré'],
  [/^Unknown error$/, 'Erreur inconnue'],
]

// Résumé d'une exécution de mise à jour des contenus : « 2 started, 1 failed, … ».
const MORCEAUX_RESUME: Regle[] = [
  [/^(\d+) started$/i, (_, n) => `${n} lancée(s)`],
  [/^(\d+) failed$/i, (_, n) => `${n} échec(s)`],
  [/^(\d+) skipped \(exceeds cap\)$/i, (_, n) => `${n} ignorée(s) (dépasse le plafond)`],
  [/^(\d+) deferred \(over budget\)$/i, (_, n) => `${n} reportée(s) (budget dépassé)`],
]

function appliquer(regles: Regle[], message: string): string | null {
  for (const [motif, remplacement] of regles) {
    const resultat = message.match(motif)
    if (resultat) {
      return typeof remplacement === 'string' ? remplacement : remplacement(...resultat)
    }
  }
  return null
}

/** Traduit un message du serveur s'il est connu ; sinon le renvoie tel quel. */
export function traduireMessageServeur(message: string | null | undefined): string {
  if (!message) return message ?? ''
  const texte = message.trim()
  const traduit = appliquer(REGLES, texte) ?? appliquer(REGLES_API, texte)
  if (traduit !== null) return traduit

  const morceaux = texte.split(', ')
  const morceauxTraduits = morceaux.map((m) => appliquer(MORCEAUX_RESUME, m))
  if (morceauxTraduits.every((m) => m !== null)) return morceauxTraduits.join(', ')

  return message
}
