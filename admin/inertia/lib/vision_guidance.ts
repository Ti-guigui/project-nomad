import type { ModelVisionCapability } from '../../types/ollama.js'

const TEMPORARY_IMAGE_NOTICE =
  'Les images sont envoyées uniquement avec cette requête. Elles ne sont pas enregistrées et disparaîtront après l’envoi ou au rechargement de la page.'

export function visionAttachmentGuidance(capability: ModelVisionCapability): string {
  if (capability === 'unsupported') {
    return 'Ce modèle ne peut pas utiliser d’images. Choisissez un modèle marqué « Accepte les images » dans Modèles et paramètres.'
  }

  if (capability === 'unknown') {
    return `NOMAD ne peut pas confirmer que ce modèle accepte les images. Vous pouvez essayer, mais la requête échouera si le modèle ne gère que le texte. ${TEMPORARY_IMAGE_NOTICE}`
  }

  return TEMPORARY_IMAGE_NOTICE
}
