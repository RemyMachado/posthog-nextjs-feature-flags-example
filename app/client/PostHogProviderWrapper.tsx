'use client';

import { FeatureFlagProvider } from '@/app/client/FeatureFlagContext';
import { FeatureFlagMap } from '@/app/shared/feature-flag-map';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode } from 'react';

interface PostHogProviderWrapperProps {
  children: ReactNode;
  serverFeatureFlags: FeatureFlagMap;
}

export const PostHogProviderWrapper = ({ 
  children, 
  serverFeatureFlags,
}: PostHogProviderWrapperProps) => {

  return (
    <PostHogProvider apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY!} options={{
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
      // Removed bootstrap option since it doesn't work properly with SSR
      // Our custom FeatureFlagProvider handles this better
    }}>
      <FeatureFlagProvider bootstrappedFlags={serverFeatureFlags}>
        {children}
      </FeatureFlagProvider>
    </PostHogProvider>
  );
};