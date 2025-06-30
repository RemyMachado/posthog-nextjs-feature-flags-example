'use client';

import { FeatureFlagContext } from '@/app/client/FeatureFlagContext';
import { FeatureFlagMap } from '@/app/shared/feature-flag-map';
import { usePostHog } from 'posthog-js/react';
import { useContext } from 'react';

/**
 * Custom hook that provides feature flags from PostHog, since there is no useFeatureFlags hook
 * 
 * @returns Record of all feature flags
 */
export function useNativeFeatureFlags(): FeatureFlagMap {
  const posthog = usePostHog();
  const { bootstrappedFlags } = useContext(FeatureFlagContext);
  
  if (!posthog) {
    return bootstrappedFlags;
  }
  
  return Object.keys(bootstrappedFlags).reduce((acc, key) => {
    acc[key] = posthog.isFeatureEnabled(key);
    return acc;
  }, {} as FeatureFlagMap);
}
