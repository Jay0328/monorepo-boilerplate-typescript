import { useContext } from 'react';
import { MonoModuleContext } from './MonoModuleContext';

export function useMonoModule() {
  return useContext(MonoModuleContext);
}
