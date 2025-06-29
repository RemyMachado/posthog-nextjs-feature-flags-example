import { ClientFeatureFlags } from './client/ClientFeatureFlags';
import ServerFeatureFlags from './server/ServerFeatureFlags';

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Posthog Feature Flags Playground</h1>
      <p className="mb-6 text-gray-400">
        This playground demonstrates how feature flags work both on the server-side and client-side.
        There is a special implementation to correctly hydrate client side with server-side flags without flickering.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ServerFeatureFlags />
        <ClientFeatureFlags />
      </div>
    </div>
  );
}
