import type { Handler, Middleware } from "./types";

/**
 * Applies middleware to a handler in right-to-left order.
 *
 * Strongly typed:
 * - Preserves exact context
 * - Preserves exact input
 * - Preserves exact output
 */
export function applyMiddleware<TContext extends object, TInput, TOutput>(
  handler: Handler<TContext, TInput, TOutput>,
  middlewares: readonly Middleware<TContext, TInput, TOutput>[],
): Handler<TContext, TInput, TOutput> {
  return middlewares.reduceRight(
    (next, middleware) => middleware(next),
    handler,
  );
}
