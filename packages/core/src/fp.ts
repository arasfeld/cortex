export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (input: T): T =>
    fns.reduce((acc, fn) => fn(acc), input);

export const flow = pipe;
export const merge = <T, U>(a: T, b: U): T & U => ({ ...a, ...b });
export const identity = <T>(x: T): T => x;
export const constant =
  <T>(x: T) =>
  () =>
    x;
