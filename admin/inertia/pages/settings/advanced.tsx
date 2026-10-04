import { Head } from '@inertiajs/react'
import { useState } from 'react'
import SettingsLayout from '~/layouts/SettingsLayout'
import StyledButton from '~/components/StyledButton'
import StyledSectionHeader from '~/components/StyledSectionHeader'
import Alert from '~/components/Alert'
import Input from '~/components/inputs/Input'
import { useNotifications } from '~/context/NotificationContext'
import { useMutation } from '@tanstack/react-query'
import api from '~/lib/api'

export default function AdvancedPage(props: {
  advanced: {
    internetStatusTestUrl: string
    internetStatusTestUrlEnvOverride: boolean
  }
}) {
  const { addNotification } = useNotifications()
  const { internetStatusTestUrlEnvOverride } = props.advanced

  const [internetStatusTestUrl, setInternetStatusTestUrl] = useState(
    props.advanced.internetStatusTestUrl ?? ''
  )
  const [testUrlError, setTestUrlError] = useState<string | null>(null)

  // Mirror the backend validation (admin/app/validators/settings.ts) for instant
  // feedback. The backend remains the source of truth and returns 422 on failure.
  function validateTestUrl(value: string): string | null {
    if (value.trim() === '') return null // empty clears the setting
    try {
      const url = new URL(value)
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return "L'URL de test doit utiliser http ou https."
      }
    } catch {
      return "L'URL de test doit être une URL valide (ex. « https://example.com »)."
    }
    return null
  }

  const updateTestUrlMutation = useMutation({
    mutationFn: async (value: string) => {
      return await api.updateSetting('system.internetStatusTestUrl', value)
    },
    onSuccess: () => {
      addNotification({ message: 'Réglage mis à jour.', type: 'success' })
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Une erreur est survenue lors de la mise à jour du réglage. Veuillez réessayer.'
      setTestUrlError(msg)
      addNotification({ message: msg, type: 'error' })
    },
  })

  function handleSaveTestUrl() {
    const trimmed = internetStatusTestUrl.trim()
    const validationError = validateTestUrl(trimmed)
    if (validationError) {
      setTestUrlError(validationError)
      return
    }
    setTestUrlError(null)
    updateTestUrlMutation.mutate(trimmed)
  }

  return (
    <SettingsLayout>
      <Head title="Paramètres avancés | Project NOMAD" />
      <div className="xl:pl-72 w-full">
        <main className="px-12 py-6">
          <h1 className="text-4xl font-semibold mb-4">Avancé</h1>
          <p className="text-text-muted mb-4">
            Configuration avancée pour les administrateurs. Ces réglages sont facultatifs — les valeurs
            par défaut conviennent à la plupart des installations.
          </p>

          <StyledSectionHeader title="Connectivité" className="mt-8 mb-4" />
          <div className="bg-surface-primary rounded-lg border-2 border-border-subtle p-6">
            <p className="text-sm text-text-secondary mb-4">
              NOMAD vérifie régulièrement s'il peut joindre internet. Par défaut, il interroge le point
              d'accès utilitaire de Cloudflare, avec quelques solutions de repli. Indiquez une autre
              adresse ci-dessous si votre réseau bloque celles par défaut. Laissez vide pour utiliser
              les valeurs intégrées.
            </p>

            {internetStatusTestUrlEnvOverride && (
              <Alert
                type="info"
                variant="bordered"
                title="Géré par une variable d'environnement"
                message="La variable d'environnement INTERNET_STATUS_TEST_URL est définie et prend le pas sur ce réglage. Supprimez-la pour gérer l'URL de test ici."
                className="!mb-4"
              />
            )}

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  name="internetStatusTestUrl"
                  label="URL de test de la connexion internet"
                  helpText="Une URL http(s) utilisée pour vérifier la connexion. Toute réponse HTTP signifie « en ligne »."
                  placeholder="https://1.1.1.1/cdn-cgi/trace"
                  value={internetStatusTestUrl}
                  disabled={internetStatusTestUrlEnvOverride}
                  error={Boolean(testUrlError)}
                  onChange={(e) => {
                    setInternetStatusTestUrl(e.target.value)
                    setTestUrlError(null)
                  }}
                />
                {testUrlError && <p className="text-sm text-red-600 mt-1">{testUrlError}</p>}
              </div>
              <StyledButton
                variant="primary"
                onClick={handleSaveTestUrl}
                loading={updateTestUrlMutation.isPending}
                disabled={updateTestUrlMutation.isPending || internetStatusTestUrlEnvOverride}
                className="mb-0.5"
              >
                Enregistrer
              </StyledButton>
            </div>
          </div>
        </main>
      </div>
    </SettingsLayout>
  )
}
