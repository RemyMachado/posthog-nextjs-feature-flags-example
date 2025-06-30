'use client';

import { useFeatureFlagEnabled } from 'posthog-js/react';
import { FeatureFlagItem } from '../shared/FeatureFlag';
import { FeatureFlagList } from '../shared/FeatureFlagList';
import { useNativeFeatureFlags } from './useNativeFeatureFlags';

export function ClientFeatureFlagsNative() {
  const testFlag = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
  const isTestFlagEnabledNative = useFeatureFlagEnabled(testFlag);
  const allFlagsNative = useNativeFeatureFlags();
  
  const clientFlagData: FeatureFlagItem[] = [
    {
      name: `Native`,
      enabled: isTestFlagEnabledNative,
      description: `single: ${testFlag}`
    },
    ...Object.entries(allFlagsNative).map(([key, value]) => ({
      name: 'Native',
      enabled: value,
      description: `all: ${key}`
    })),
  ];
  
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-foreground">💻 Client-side Feature Flags (NATIVE 👎)</h2>
      <FeatureFlagList flags={clientFlagData} />
    </div>
  );
}