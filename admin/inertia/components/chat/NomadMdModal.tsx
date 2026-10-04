import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import StyledButton from '~/components/StyledButton'
import MarkdownEditor from '~/components/MarkdownEditor'
import { useNotifications } from '~/context/NotificationContext'
import api from '~/lib/api'

interface NomadMdModalProps {
  aiAssistantName?: string
  onClose: () => void
}

// Seeded into the editor when no NOMAD.md exists yet. Nothing is written to disk
// until the user saves, so this is purely a starting point they can replace.
const NOMAD_MD_TEMPLATE = `# NOMAD.md

<!--
Ce fichier contient des consignes personnalisées pour votre assistant IA. Tout ce
qui s'y trouve est envoyé à l'assistant comme instruction système à chaque
discussion : utilisez-le pour définir sa personnalité, son ton, ses priorités et
ses règles permanentes.

Il est aussi enregistré sur le disque dans storage/NOMAD.md, vous pouvez donc le
modifier directement. Remplacez ce modèle par vos propres consignes, puis cliquez
sur Enregistrer.
-->

## À propos de moi

- (ex. : je vis en Guadeloupe et je prépare mon foyer à la saison cyclonique.)

## Comment l'assistant doit répondre

- Réponds toujours en français.
- Sois concis et pratique.
- Privilégie la sécurité et les méthodes éprouvées.
- Pour les urgences en France, rappelle les numéros 15 (SAMU), 18 (pompiers), 17 (police) et 112.
`

export default function NomadMdModal({ aiAssistantName, onClose }: NomadMdModalProps) {
  const queryClient = useQueryClient()
  const { addNotification } = useNotifications()
  const [content, setContent] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['nomad-md'],
    queryFn: () => api.getNomadMd(),
  })

  // Seed the editor once the file loads: existing content, or the template when empty.
  useEffect(() => {
    if (data && content === null) {
      setContent(data.content.trim().length > 0 ? data.content : NOMAD_MD_TEMPLATE)
    }
  }, [data, content])

  const saveMutation = useMutation({
    mutationFn: (value: string) => api.saveNomadMd(value),
    onSuccess: (result) => {
      if (!result?.success) {
        addNotification({ type: 'error', message: "Impossible d'enregistrer NOMAD.md." })
        return
      }
      addNotification({ type: 'success', message: "NOMAD.md enregistré. Il s'applique aux nouveaux messages." })
      queryClient.invalidateQueries({ queryKey: ['nomad-md'] })
      onClose()
    },
    onError: (error: any) => {
      addNotification({ type: 'error', message: error?.message || "Impossible d'enregistrer NOMAD.md." })
    },
  })

  const assistantName = aiAssistantName?.trim() || 'votre assistant IA'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm transition-opacity">
      <div className="bg-surface-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border-subtle shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary">NOMAD.md</h2>
            <p className="text-sm text-text-muted mt-1">
              Consignes personnalisées transmises à {assistantName} comme instruction système à chaque discussion.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <IconX className="h-6 w-6 text-text-muted" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {isLoading || content === null ? (
            <div className="py-16 text-center text-text-muted">Chargement…</div>
          ) : (
            <div className="rounded-lg border border-border-subtle overflow-hidden h-[55vh]">
              <MarkdownEditor initialValue={content} onChange={setContent} className="h-full text-sm" />
            </div>
          )}
          <p className="text-xs text-text-muted mt-3">
            Astuce : ce fichier est aussi enregistré sur le disque dans{' '}
            <code className="font-mono">storage/NOMAD.md</code> et peut être modifié directement.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border-subtle shrink-0">
          <StyledButton variant="outline" onClick={onClose} disabled={saveMutation.isPending}>
            Annuler
          </StyledButton>
          <StyledButton
            variant="primary"
            icon="IconCircleCheck"
            onClick={() => content !== null && saveMutation.mutate(content)}
            loading={saveMutation.isPending}
            disabled={content === null}
          >
            Enregistrer
          </StyledButton>
        </div>
      </div>
    </div>
  )
}
