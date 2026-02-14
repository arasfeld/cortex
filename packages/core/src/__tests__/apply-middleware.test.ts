import { applyMiddleware } from '../apply-middleware';

describe('applyMiddleware', () => {
  it('should apply middleware in right-to-left order', async () => {
    const handler = async (_ctx: object, input: number) => input * 10;

    const double =
      (next: typeof handler) => async (ctx: object, input: number) =>
        next(ctx, input * 2);

    const addOne =
      (next: typeof handler) => async (ctx: object, input: number) =>
        next(ctx, input + 1);

    // Right-to-left order: the rightmost middleware runs first
    // In this case: double runs first, then addOne, then the handler
    const composed = applyMiddleware(handler, [addOne, double]);

    const result = await composed({}, 1);
    // Calculation:
    // double: 1 * 2 = 2
    // addOne: 2 + 1 = 3
    // handler: 3 * 10 = 30? Wait let's recalc carefully

    // Step by step:
    // reduceRight([addOne, double], handler)
    // 1. double wraps handler: double(handler)(ctx, input) = handler(ctx, input * 2)
    // 2. addOne wraps double(handler): addOne(double(handler))(ctx, input) = double(handler)(ctx, input + 1)
    // 3. call with input = 1:
    //    addOne: input + 1 = 2
    //    double(handler): 2 * 2 = 4
    //    handler: 4 * 10 = 40
    expect(result).toBe(40);
  });
});
