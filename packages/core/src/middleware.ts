import type { Middleware } from "./types";

export const compose = <C>(middleware: Middleware<C>[]): Middleware<C> => {
  return async (ctx: C, next: () => Promise<void>) => {
    let index = -1;
    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) throw new Error("next() called multiple times");
      index = i;
      const fn = middleware[i] || next;
      await fn(ctx, () => dispatch(i + 1));
    };
    await dispatch(0);
  };
};
