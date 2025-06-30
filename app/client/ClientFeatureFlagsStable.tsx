'use client';

import { useStableFeatureFlag } from '@/app/client/useStableFeatureFlag';
import { useStableFeatureFlags } from '@/app/client/useStableFeatureFlags';
import { FeatureFlagItem } from '../shared/FeatureFlag';
import { FeatureFlagList } from '../shared/FeatureFlagList';

export function ClientFeatureFlagsStable() {
  const testFlag = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
  const isTestFlagEnabledStable = useStableFeatureFlag(testFlag);
  const allFlagsSlable = useStableFeatureFlags();
  
  const clientFlagData: FeatureFlagItem[] = [
    {
      name: `Stable`,
      enabled: isTestFlagEnabledStable,
      description: `single: ${testFlag}`
    },
    ...Object.entries(allFlagsSlable).map(([key, value]) => ({
      name: 'Stable',
      enabled: value,
      description: `all: ${key}`
    }))
  ];
  
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">💻 Client-side Feature Flags (STABLE 👍)</h2>
      <FeatureFlagList flags={clientFlagData} />
    </div>
  );
}
