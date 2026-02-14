import { pipe, flow, merge, identity, constant } from '../fp';

describe('Functional helpers', () => {
  describe('pipe / flow', () => {
    it('should pipe functions left-to-right', () => {
      const f = (x: number) => x + 1;
      const g = (x: number) => x * 2;
      const h = pipe(f, g); // g(f(x))
      expect(h(3)).toBe(8);
    });

    it('flow is alias for pipe', () => {
      const f = (x: number) => x + 1;
      const g = (x: number) => x * 2;
      const h = flow(f, g);
      expect(h(3)).toBe(8);
    });

    it('should handle empty pipe', () => {
      const h = pipe<number>();
      expect(h(5)).toBe(5);
    });
  });

  describe('merge', () => {
    it('should merge two objects', () => {
      const a = { foo: 1 };
      const b = { bar: 2 };
      const result = merge(a, b);
      expect(result).toEqual({ foo: 1, bar: 2 });
    });
  });

  describe('identity', () => {
    it('should return input as-is', () => {
      expect(identity(42)).toBe(42);
      const obj = { a: 1 };
      expect(identity(obj)).toBe(obj);
    });
  });

  describe('constant', () => {
    it('should return a function that always returns the value', () => {
      const always7 = constant(7);
      expect(always7()).toBe(7);
    });
  });
});
