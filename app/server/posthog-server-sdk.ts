import { PostHog } from 'posthog-node'

export default function getPostHogServerSdk() {
  const posthogServerSdk = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0
  })

  return posthogServerSdk
}