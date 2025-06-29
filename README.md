# PostHog Feature Flag Flicker Fix

This repository demonstrates a solution to the client-side flickering issue with PostHog feature flags in Next.js applications using the App Router.

## The Problem

When using PostHog feature flags in a Next.js application, you might experience a "flicker" where the feature flag initially renders as `false` and then switches to `true` after hydration. This happens even when using PostHog's bootstrap option, which is supposed to prevent this issue.

This is a known issue with the PostHog React SDK, as documented in [GitHub issue #1714](https://github.com/PostHog/posthog-js/issues/1714) and [GitHub issue #18333](https://github.com/PostHog/posthog/issues/18333).

## The Solution

This repository implements a custom React context provider and hooks that wrap PostHog's feature flag functionality. The solution:

1. Fetches all feature flags server-side using the PostHog Node SDK
2. Passes these flags to a custom React context provider
3. Provides custom hooks that check PostHog client-side values but fall back to server-fetched values when needed

This ensures consistent feature flag values during hydration and prevents the flickering effect.

## How It Works

### Server-side

1. In the root layout, we fetch all feature flags using the PostHog Node SDK's `getAllFlags` method
2. These flags are passed to our `FeatureFlagProvider` component

### Client-side

1. The `FeatureFlagProvider` makes the bootstrapped flags available via React context
2. Two custom hooks provide access to feature flags:
   - `useStableFeatureFlags()` - Returns all feature flags
   - `useStableFeatureFlag(flagName)` - Returns a single feature flag value
3. These hooks check PostHog client values first, but fall back to bootstrapped values when needed

## Setup

1. Clone this repository
2. Create a `.env` file with the following variables:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_api_key
   NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host
   NEXT_PUBLIC_TEST_FEATURE_FLAG=YOUR_TEST_FLAG_NAME
   ```
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000 to see the demo

## Features

- ✅ Eliminates feature flag flickering during hydration
- ✅ Displays all available feature flags in the UI
- ✅ Server-side and client-side feature flag consistency
- ✅ Handles both individual flag checks and all flags at once
- ✅ Graceful fallback for when PostHog is not available
- ✅ Simple, readable implementation with minimal dependencies
- ✅ Clean architecture with proper separation of concerns


### Usage Examples

#### For a single flag:
```tsx
import { useStableFeatureFlag } from '@/app/client/useStableFeatureFlag';

function MyComponent() {
  const isFeatureEnabled = useStableFeatureFlag('MY_FEATURE_FLAG');
  
  return (
    <div>
      Feature is: {isFeatureEnabled ? 'enabled' : 'disabled'}
    </div>
  );
}
```

#### For all flags:
```tsx
import { useStableFeatureFlags } from '@/app/client/useStableFeatureFlags';

function MyComponent() {
  const allFlags = useStableFeatureFlags();
  
  return (
    <div>
      {Object.entries(allFlags).map(([key, value]) => (
        <div key={key}>{key}: {String(value)}</div>
      ))}
    </div>
  );
}
```

## Notes

- This solution is designed for Next.js 13+ with App Router
- All sensitive data (API keys, flag names) are stored in environment variables
- The solution uses a generic distinct ID (`demo-distinct-id`) for demo purposes
- The PostHog client SDK does not expose a direct API to enumerate all possible feature flags
- This implementation is robust to PostHog SDK differences and future changes
