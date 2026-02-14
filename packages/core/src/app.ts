import { App, AppState, Middleware, BaseContext } from "./types";

export const createAppState = <C extends BaseContext>(): AppState<C> => ({
  middleware: [],
  routes: {},
  services: {},
});

export const addMiddleware = <C extends BaseContext>(
  state: AppState<C>,
  mw: Middleware<C>,
): AppState<C> => ({
  ...state,
  middleware: [...state.middleware, mw],
});

export const addRoute = <C extends BaseContext>(
  state: AppState<C>,
  path: string,
  handler: Middleware<C>,
): AppState<C> => ({
  ...state,
  routes: { ...state.routes, [path]: handler },
});

export const createApp = <C extends BaseContext>(): App<C> => ({
  state: createAppState<C>(),
});

export const useMiddleware = <C extends BaseContext>(
  app: App<C>,
  mw: Middleware<C>,
): App<C> => ({
  state: addMiddleware(app.state, mw),
});

export const useRoute = <C extends BaseContext>(
  app: App<C>,
  path: string,
  handler: Middleware<C>,
): App<C> => ({
  state: addRoute(app.state, path, handler),
});
