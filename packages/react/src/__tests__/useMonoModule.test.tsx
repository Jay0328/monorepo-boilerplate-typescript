import React, { FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { MonoModule } from '@jay-mono-ts/core';
import { MonoModuleContext } from '../MonoModuleContext';
import { useMonoModule } from '../useMonoModule';

describe('useMonoModule', () => {
  it('get mono module instance', () => {
    const monoModule = new MonoModule('name');
    const wrapper: FC = ({ children }) => (
      <MonoModuleContext.Provider value={monoModule}>{children}</MonoModuleContext.Provider>
    );
    const { result } = renderHook(() => useMonoModule(), { wrapper });

    expect(result.current).toBeInstanceOf(MonoModule);
    expect(result.current).toBe(monoModule);
  });
});
