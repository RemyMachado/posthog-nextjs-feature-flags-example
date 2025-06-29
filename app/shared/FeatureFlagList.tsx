import { FeatureFlag, FeatureFlagItem } from './FeatureFlag';

interface FeatureFlagListProps {
  flags: FeatureFlagItem[];
}

export function FeatureFlagList({ flags }: FeatureFlagListProps) {
  return (
    <div className="space-y-4">
      {flags.map((flag) => (
        <FeatureFlag 
          key={flag.name} 
          flag={flag} 
        />
      ))}
    </div>
  );
}
