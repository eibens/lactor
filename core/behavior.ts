import { Lookup } from "https://deno.land/x/lgram@v0.0.0/lookup.ts";
import { Shift } from "./shift.ts";

export type Reducer<X> = Lookup<X, X>;

export type Mutator<X> = Lookup<X, void>;

export type Behavior<X, L extends Lookup<X, X | void>> = {
  [k in keyof L]: (x: X, ...a: Shift<Parameters<L[k]>>) => X;
};

export function Behavior<X, M extends Mutator<X>>(mutator: M): Behavior<X, M> {
  const reducer: Partial<Lookup<X, X>> = {};
  for (const k of Object.keys(mutator)) {
    reducer[k] = (x, ...args) => {
      const y = { ...x };
      mutator[k](y, ...args);
      return y;
    };
  }
  return reducer as Behavior<X, M>;
}
