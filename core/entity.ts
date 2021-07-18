import { Reducer } from "./behavior.ts";
import { Shift } from "./shift.ts";

export type Entity<X, R extends Reducer<X>> = {
  [k in keyof R]: (...a: Shift<Parameters<R[k]>>) => void;
};

export function Entity<X, R extends Reducer<X>>(
  reducer: R,
  init: X,
): Entity<X, R> {
  let state = init;
  const entity: Partial<Entity<X, R>> = {};
  for (const k of Object.keys(reducer) as (keyof R)[]) {
    entity[k] = (...args: unknown[]) => {
      state = reducer[k](state, ...args);
    };
  }
  return entity as Entity<X, R>;
}
