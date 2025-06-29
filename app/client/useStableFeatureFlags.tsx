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
  // Get PostHog client
  const posthog = usePostHog();
  // Get our bootstrapped flags from context
  const { bootstrappedFlags } = useContext(FeatureFlagContext);
  
  // If PostHog is not available, return bootstrapped flags
  if (!posthog) {
    return bootstrappedFlags;
  }
  
  // Create a map to hold our final flags
  const combinedFlags: FeatureFlagMap = {};
  
  // First, copy all bootstrapped flags as our baseline
  Object.entries(bootstrappedFlags).forEach(([key, value]) => {
    combinedFlags[key] = value;
  });
  
  // For each bootstrapped flag, check if PostHog has a value
  Object.keys(bootstrappedFlags).forEach(key => {
      // Check if the flag is enabled in PostHog
      const isEnabled = posthog.isFeatureEnabled(key);
      
      // Only override if PostHog returns a defined value
      if (isEnabled !== undefined) {
        combinedFlags[key] = isEnabled;
      }
  });
  
  return combinedFlags;
}
