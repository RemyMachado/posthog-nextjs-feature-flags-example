
export type FeatureFlagItem = {
  name: string;
  description: string;
  enabled: boolean | undefined;
}

interface FeatureFlagProps {
  flag: FeatureFlagItem;
}

export function FeatureFlag({ flag }: FeatureFlagProps) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--card-border)] pb-3">
      <div>
        <p className="font-medium text-foreground">{flag.name}</p>
        <p className="text-sm text-gray-400">{flag.description}</p>
      </div>
      <div 
        className={`px-3 py-1 rounded-full text-sm ${
          flag.enabled === true
            ? 'bg-[var(--success-bg)] text-[var(--success-text)]' 
            : flag.enabled === false
              ? 'bg-[var(--error-bg)] text-[var(--error-text)]'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          {flag.enabled === true 
            ? 'Enabled' 
            : flag.enabled === false 
              ? 'Disabled' 
              : 'Undefined'}
        </div>
    </div>
  );
}
