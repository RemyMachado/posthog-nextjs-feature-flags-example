// Server Component for server-side feature flag results
import { FeatureFlagItem } from '../shared/FeatureFlag';
import { FeatureFlagList } from '../shared/FeatureFlagList';
import { getServerFeatureFlags } from './getServerFeatureFlags';

export default async function ServerFeatureFlags() {
  const allFlags = await getServerFeatureFlags('demo-distinct-id')

  // Convert the flags object to an array of FeatureFlag objects for display
  const serverFlagData: FeatureFlagItem[] = Object.entries(allFlags).map(([key, value]) => ({
    name: key.toLowerCase().replace(/_/g, '-'),
    enabled: !!value,
    description: `Feature flag: ${key}`
  }));

  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">📡 Server-Side Feature Flags</h2>
      <FeatureFlagList flags={serverFlagData} />
    </div>
  );
}


