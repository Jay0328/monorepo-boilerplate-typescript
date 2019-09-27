import { createContext } from 'react';
import { MonoModule } from '@jay-mono-ts/core';

export const MonoModuleContext = createContext<MonoModule>({} as MonoModule);
