import { FeatureFlagMap } from '../shared/feature-flag-map';
import getPostHogServerSdk from './posthog-server-sdk';


/**
 * Fetches all feature flags from PostHog server-side
 * @param distinctId The user's distinct ID
 * @returns A record of feature flag names to their values
 */
export async function getServerFeatureFlags(distinctId: string): Promise<FeatureFlagMap> {
  const postHogServerSdk = getPostHogServerSdk();
  
  const allFlags = await postHogServerSdk.getAllFlags(distinctId);
  
  const typedFlags: FeatureFlagMap = {};
  
  // TODO: handle variants
  Object.entries(allFlags).forEach(([key, value]) => {
    typedFlags[key] = !!value;
  });
    
  await postHogServerSdk.shutdown();

  console.log('\n\n[SERVER] all feature flags:', typedFlags)

  return typedFlags;
}