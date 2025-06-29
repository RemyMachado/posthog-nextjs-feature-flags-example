'use client';

import { useStableFeatureFlag } from '@/app/client/useStableFeatureFlag';
import { useStableFeatureFlags } from '@/app/client/useStableFeatureFlags';
import { FeatureFlagItem } from '../shared/FeatureFlag';
import { FeatureFlagList } from '../shared/FeatureFlagList';

export function ClientFeatureFlags() {
  // Get all feature flags using our stable hook
  const allFlags = useStableFeatureFlags();
  
  // Get a single flag using our single flag hook
  const testFlagName = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
  const singleFlagEnabled = useStableFeatureFlag(testFlagName);
  
  // Create an array of feature flags for display
  const clientFlagData: FeatureFlagItem[] = [
    // First show the single flag example
    {
      name: `${testFlagName.toLowerCase().replace(/_/g, '-')}`,
      enabled: !!singleFlagEnabled,
      description: 'hook: SINGLE'
    },
    // Then show all flags from the all-flags hook
    ...Object.entries(allFlags).map(([key, value]) => ({
      name: key.toLowerCase().replace(/_/g, '-'),
      enabled: !!value,
      description: `hook: ALL`
    }))
  ];
  
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">Client-side Feature Flags</h2>
      <FeatureFlagList flags={clientFlagData} />
    </div>
  );
}
