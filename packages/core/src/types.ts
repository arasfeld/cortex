// Base request/response context
export type BaseContext = {
  request?: unknown;
  response?: unknown;
  services: Record<string, any>;
  params?: Record<string, string>;
};

// Generic context type with default
export type Context<C extends BaseContext = BaseContext> = C;

// Middleware: generic over context, defaults to BaseContext
export type Middleware<C extends BaseContext = BaseContext> = (
  ctx: Context<C>,
  next: () => Promise<void>,
) => Promise<void>;

// Plugins: pure functions that transform app state
export type Plugin<C extends BaseContext = BaseContext> = (
  app: App<C>,
) => App<C>;

// Services: factories with optional dependency injection
export type ServiceFactory<T, Deps = any> = (deps: Deps) => T;

export type ServiceOptions = {
  scope?: "singleton" | "request" | "transient";
};

// App state: immutable, functional
export type App<C extends BaseContext = BaseContext> = {
  state: AppState<C>;
};

export type AppState<C extends BaseContext = BaseContext> = {
  middleware: Middleware<C>[];
  routes: Record<string, Middleware<C>>;
  services: Record<string, any>;
};
