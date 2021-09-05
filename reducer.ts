export type Args<A, K extends keyof A> = A[K] extends
  ((...args: infer P) => unknown | Promise<unknown>) ? P
  : never;

export type Message<A, K extends keyof A> = [K, ...Args<A, K>];

export type Reducer<A> = <K extends keyof A>(
  ...message: Message<A, K>
) => unknown | Promise<unknown>;

export function reducerFromObject<A>(object: A): Reducer<A> {
  return async (key, ...args) => {
    const value = object[key];
    if (typeof object[key] === "function") {
      const func = value as unknown as (
        ...args: Args<A, keyof A>
      ) => Promise<void>;
      return await func.bind(object as never)(...args);
    } else {
      throw new Error(
        `unknown message "${key}"`,
      );
    }
  };
}

export function objectFromReducer<A>(
  keys: (keyof A)[],
  reducer: Reducer<A>,
): A {
  const target: Partial<A> = {};
  keys.forEach((key) => target[key] = undefined);
  return new Proxy(target, {
    get: (_, prop) => {
      const key = prop as keyof A;
      return async (...args: Args<A, typeof key>) => {
        return await (reducer)(key, ...args);
      };
    },
  }) as A;
}
