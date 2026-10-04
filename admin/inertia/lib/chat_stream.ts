const GENERIC_CHAT_STREAM_ERROR = 'Le modèle a rencontré une erreur. Veuillez réessayer.'

export function chatStreamErrorMessage(event: unknown): string | null {
  if (!event || typeof event !== 'object' || !('error' in event) || !event.error) {
    return null
  }

  const message = 'message' in event ? event.message : undefined
  return typeof message === 'string' && message.trim() ? message : GENERIC_CHAT_STREAM_ERROR
}
