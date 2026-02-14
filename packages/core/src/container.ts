type Factory<T, Deps = any> = (deps: Deps) => T;

type Entry<T> = {
  factory: Factory<T>;
  instance?: T;
  scope: "singleton" | "request" | "transient";
};

export const createContainer = () => {
  const services = new Map<string, Entry<any>>();

  const service = <T>(
    name: string,
    factory: Factory<T>,
    options?: { scope?: "singleton" | "request" | "transient" },
  ) => {
    services.set(name, { factory, scope: options?.scope ?? "singleton" });
    return services;
  };

  const resolve = <T>(name: string, requestDeps?: Record<string, any>): T => {
    const entry = services.get(name);
    if (!entry) throw new Error(`Service "${name}" not registered`);
    if (entry.scope === "singleton") {
      if (!entry.instance) entry.instance = entry.factory(requestDeps ?? {});
      return entry.instance;
    }
    return entry.factory(requestDeps ?? {});
  };

  return { service, resolve };
};
