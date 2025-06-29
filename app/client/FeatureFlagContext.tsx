'use client';

import { FeatureFlagMap } from '@/app/shared/feature-flag-map';
import { createContext, ReactNode, useContext } from 'react';

export interface FeatureFlagContextType {
  bootstrappedFlags: FeatureFlagMap;
}

export const FeatureFlagContext = createContext<FeatureFlagContextType>({
  bootstrappedFlags: {},
});

export const useFeatureFlagContext = () => useContext(FeatureFlagContext);

interface FeatureFlagProviderProps {
  children: ReactNode;
  bootstrappedFlags: FeatureFlagMap;
}

export function FeatureFlagProvider({ 
  children, 
  bootstrappedFlags 
}: FeatureFlagProviderProps) {
  return (
    <FeatureFlagContext.Provider value={{ bootstrappedFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

