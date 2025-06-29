// Server Component for server-side feature flag results
import { FeatureFlagItem } from '../shared/FeatureFlag';
import { FeatureFlagList } from '../shared/FeatureFlagList';
import getPostHogServerSdk from './posthog-server-sdk';

export default async function ServerFeatureFlags() {
  const postHogServerSdk = getPostHogServerSdk()
  const distinctId = 'anonymous-user';
  
  // Fetch all feature flags
  const allFlags = await postHogServerSdk.getAllFlags(distinctId);
  await postHogServerSdk.shutdown()

  console.log('[SERVER] all feature flags:', allFlags)

  // Convert the flags object to an array of FeatureFlag objects for display
  const serverFlagData: FeatureFlagItem[] = Object.entries(allFlags).map(([key, value]) => ({
    name: key.toLowerCase().replace(/_/g, '-'),
    enabled: typeof value === 'boolean' ? value : !!value,
    description: `Feature flag: ${key}`
  }));
  
  // If no flags are available, show a placeholder
  if (serverFlagData.length === 0) {
    const testFlagName = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
    serverFlagData.push({
      name: testFlagName.toLowerCase().replace(/_/g, '-'),
      enabled: false,
      description: 'No feature flags available'
    });
  }

  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">Server-Side Feature Flags</h2>
      <FeatureFlagList flags={serverFlagData} />
    </div>
  );
}


