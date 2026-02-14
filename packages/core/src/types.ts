/**
 * A request handler.
 *
 * TContext  - shared app context (dependencies, env, etc.)
 * TInput    - input payload type
 * TOutput   - output payload type
 */
export type Handler<TContext extends object, TInput, TOutput> = (
  context: TContext,
  input: TInput
) => Promise<TOutput>;

/**
 * Middleware transforms a handler into another handler
 * while preserving its full type signature.
 */
export type Middleware<TContext extends object, TInput, TOutput> = (
  next: Handler<TContext, TInput, TOutput>
) => Handler<TContext, TInput, TOutput>;

/**
 * A generic function type using unknown instead of any.
 */
export type UnknownFn = (...args: unknown[]) => unknown;
