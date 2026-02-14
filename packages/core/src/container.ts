type Factory<TContext extends object, TValue> = (context: TContext) => TValue;

export class Container<TContext extends object> {
  private readonly factories: Map<string, Factory<TContext, unknown>> =
    new Map();

  register<TValue>(key: string, factory: Factory<TContext, TValue>): void {
    this.factories.set(key, factory);
  }

  resolve<TValue>(key: string, context: TContext): TValue {
    const factory = this.factories.get(key);

    if (!factory) {
      throw new Error(`Dependency "${key}" not found`);
    }

    return factory(context) as TValue;
  }
}
