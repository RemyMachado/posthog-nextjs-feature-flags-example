'use client';

import { FeatureFlagContext } from '@/app/client/FeatureFlagContext';
import { FeatureFlagMap } from '@/app/shared/feature-flag-map';
import { usePostHog } from 'posthog-js/react';
import { useContext } from 'react';

/**
 * Custom hook that provides stable feature flags during hydration
 * Uses PostHog client but falls back to bootstrapped values
 * to prevent flickering during initial render
 * 
 * @returns Record of all feature flags
 */
export function useStableFeatureFlags(): FeatureFlagMap {
  const posthog = usePostHog();
  const { bootstrappedFlags } = useContext(FeatureFlagContext);
  
  if (!posthog) {
    return bootstrappedFlags;
  }
  
  const combinedFlags: FeatureFlagMap = {};
  
  Object.entries(bootstrappedFlags).forEach(([key, value]) => {
    combinedFlags[key] = value;
  });
  
  Object.keys(bootstrappedFlags).forEach(key => {
    const isEnabled = posthog.isFeatureEnabled(key);
    
    if (isEnabled !== undefined) {
      combinedFlags[key] = isEnabled;
    }
  });
  
  return combinedFlags;
}
