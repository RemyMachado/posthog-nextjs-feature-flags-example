import { FeatureFlagMap } from '../shared/feature-flag-map';
import getPostHogServerSdk from './posthog-server-sdk';


/**
 * Fetches all feature flags from PostHog server-side
 * @param distinctId The user's distinct ID
 * @returns A record of feature flag names to their values
 */
export async function getServerFeatureFlags(distinctId: string = 'anonymous-user'): Promise<FeatureFlagMap> {
  const postHogServerSdk = getPostHogServerSdk();
  
  try {
    // Fetch all feature flags for the user
    const allFlags = await postHogServerSdk.getAllFlags(distinctId);
    
    // Convert to our FeatureFlagMap type (boolean | undefined)
    const typedFlags: FeatureFlagMap = {};
    
    // Process each flag to ensure it matches our expected type
    Object.entries(allFlags).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        typedFlags[key] = value;
      } else if (value !== null && value !== undefined) {
        // For non-boolean values, convert to boolean true
        typedFlags[key] = true;
      }
    });
    
    // For demo purposes, if no flags are returned, add a test flag
    if (Object.keys(typedFlags).length === 0) {
      const testFlagName = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
      typedFlags[testFlagName] = true;
    }
    
    return typedFlags;
  } catch (error) {
    console.error('Error fetching feature flags:', error);
    
    // Fallback to a test flag if there's an error
    const testFlagName = process.env.NEXT_PUBLIC_TEST_FEATURE_FLAG || 'TEST_FEATURE_FLAG';
    return { [testFlagName]: true };
  } finally {
    // Clean up the PostHog client
    await postHogServerSdk.shutdown();
  }
}
