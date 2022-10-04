import { useOutletContext } from 'react-router-dom'

interface CtaConfigInterface {
  partner: string
  env: string
  contentSpace: string
  // We use dev for testing on our different environments - you can safely ignore it
  dev: any
}

export default function useCtaConfig() {
  const { ctaConfig } = useOutletContext<{ ctaConfig: CtaConfigInterface }>()
  return ctaConfig
}
