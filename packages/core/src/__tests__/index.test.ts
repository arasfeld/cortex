import * as Core from '../index';

describe('Index exports', () => {
  it('should export all modules', () => {
    expect(Core).toHaveProperty('applyMiddleware');
    expect(Core).toHaveProperty('Container');
    expect(Core).toHaveProperty('pipe');
    expect(Core).toHaveProperty('flow');
    expect(Core).toHaveProperty('merge');
    expect(Core).toHaveProperty('identity');
    expect(Core).toHaveProperty('constant');
  });
});
