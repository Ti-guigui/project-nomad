import { useState } from 'react'
import StyledModal, { StyledModalProps } from './StyledModal'
import Input from './inputs/Input'
import api from '~/lib/api'

export type DownloadURLModalProps = Omit<
  StyledModalProps,
  'onConfirm' | 'open' | 'confirmText' | 'cancelText' | 'confirmVariant' | 'children'
> & {
  suggestedURL?: string
  onPreflightSuccess?: (url: string) => void
}

const DownloadURLModal: React.FC<DownloadURLModalProps> = ({
  suggestedURL,
  onPreflightSuccess,
  ...modalProps
}) => {
  const [url, setUrl] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function runPreflightCheck(downloadUrl: string) {
    try {
      setLoading(true)
      setMessages([`Vérification préalable de l'URL : ${downloadUrl}`])
      const res = await api.downloadRemoteMapRegionPreflight(downloadUrl)
      if (!res) {
        throw new Error('Une erreur inconnue est survenue pendant la vérification préalable.')
      }

      if ('message' in res) {
        throw new Error(res.message)
      }

      setMessages((prev) => [
        ...prev,
        `Vérification réussie. Fichier : ${res.filename}, taille : ${(res.size / (1024 * 1024)).toFixed(2)} Mo`,
      ])

      if (onPreflightSuccess) {
        onPreflightSuccess(downloadUrl)
      }
    } catch (error) {
      console.error('Preflight check failed:', error)
      setMessages((prev) => [...prev, `Échec de la vérification : ${error.message}`])
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledModal
      {...modalProps}
      onConfirm={() => runPreflightCheck(url)}
      open={true}
      confirmText="Télécharger"
      confirmIcon="IconDownload"
      cancelText="Annuler"
      confirmVariant="primary"
      confirmLoading={loading}
      cancelLoading={loading}
      large
    >
      <div className="flex flex-col pb-4">
        <p className="text-text-secondary mb-8">
          Saisissez l'URL du fichier de région cartographique à télécharger. L'URL doit être
          accessible publiquement et se terminer par .pmtiles. Une vérification préalable contrôlera
          la disponibilité, le type et la taille approximative du fichier.
        </p>
        <Input
          name="download-url"
          label=""
          placeholder={suggestedURL || "Saisissez l'URL de téléchargement…"}
          className="mb-4"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="min-h-24 max-h-96 overflow-y-auto bg-surface-secondary p-4 rounded border border-border-default text-left">
          {messages.map((message, idx) => (
            <p
              key={idx}
              className="text-sm text-text-primary font-mono leading-relaxed break-words mb-3"
            >
              {message}
            </p>
          ))}
        </div>
      </div>
    </StyledModal>
  )
}

export default DownloadURLModal
