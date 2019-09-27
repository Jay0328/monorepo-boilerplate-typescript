import { MonoModule } from '../mono.module';

describe('MonoModule', () => {
  it('name', () => {
    const monoModule = new MonoModule('name');
    expect(monoModule.name).toBe('name');
  });
});
