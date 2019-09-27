import { createContext, useContext } from 'react';
import { MonoModule } from '@jay-mono-ts/core';

export const MonoModuleContext = createContext<MonoModule>({} as MonoModule);

export function useMonoModule() {
  return useContext(MonoModuleContext);
}
