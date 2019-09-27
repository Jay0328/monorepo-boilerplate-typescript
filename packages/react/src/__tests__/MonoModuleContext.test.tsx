import React from 'react';
import {
  isValidElementType,
  isContextProvider,
  isContextConsumer,
  typeOf,
  ContextProvider,
  ContextConsumer
} from 'react-is';
import { MonoModuleContext } from '../MonoModuleContext';

describe('MonoModuleContext', () => {
  it('is context', () => {
    expect(isValidElementType(MonoModuleContext.Provider)).toBe(true);
    expect(isValidElementType(MonoModuleContext.Consumer)).toBe(true);
    //  @ts-ignore
    expect(isContextProvider(<MonoModuleContext.Provider />)).toBe(true);
    //  @ts-ignore
    expect(isContextConsumer(<MonoModuleContext.Consumer />)).toBe(true);
    //  @ts-ignore
    expect(typeOf(<MonoModuleContext.Provider />)).toBe(ContextProvider);
    //  @ts-ignore
    expect(typeOf(<MonoModuleContext.Consumer />)).toBe(ContextConsumer);
  });
});
