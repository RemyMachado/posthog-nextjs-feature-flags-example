'use client';

import { FeatureFlagContext } from '@/app/client/FeatureFlagContext';
import { usePostHog } from 'posthog-js/react';
import { useContext } from 'react';

/**
 * Custom hook that provides a stable feature flag value during hydration
 * Uses PostHog client but falls back to bootstrapped values
 * to prevent flickering during initial render
 * 
 * @param flagName The name of the feature flag to check
 * @returns boolean | undefined - The feature flag value
 */
export function useStableFeatureFlag(flagName: string): boolean | undefined {
  // Get PostHog client
  const posthog = usePostHog();
  // Get our bootstrapped flags from context
  const { bootstrappedFlags } = useContext(FeatureFlagContext);
  
  // If PostHog is available, check the flag
  if (posthog) {
    const isEnabled = posthog.isFeatureEnabled(flagName);
    
    // If PostHog has a value, use it
    if (isEnabled !== undefined) {
      return isEnabled;
    }
  }
  
  // Otherwise, fall back to our bootstrapped value
  return bootstrappedFlags[flagName];
}
