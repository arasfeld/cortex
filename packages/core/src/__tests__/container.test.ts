import { Container } from '../container';

describe('Container', () => {
  it('should register and resolve values', () => {
    const container = new Container<{ foo?: number }>();
    container.register('foo', (ctx) => ctx.foo!);
    const result = container.resolve('foo', { foo: 123 });
    expect(result).toBe(123);
  });

  it('should throw when resolving unregistered key', () => {
    const container = new Container<object>();
    expect(() => container.resolve('missing', {})).toThrow();
  });

  it('should allow overwriting values', () => {
    const container = new Container<{ value?: number }>();
    container.register('foo', (ctx) => ctx.value!);
    container.register('foo', () => 2);
    const result = container.resolve('foo', { value: 1 });
    expect(result).toBe(2);
  });

  it('should handle complex context', () => {
    type Ctx = { a: number; b: number };
    const container = new Container<Ctx>();
    container.register('sum', (ctx) => ctx.a + ctx.b);
    const result = container.resolve('sum', { a: 3, b: 4 });
    expect(result).toBe(7);
  });
});
