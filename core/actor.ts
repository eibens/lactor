import { apply, Command } from "https://deno.land/x/lgram@v0.0.0/lookup.ts";
import { Reducer } from "./behavior.ts";

export type Action<X, R extends Reducer<X>> = Command<X, X, R>;

export type Actor<X, R extends Reducer<X>> = {
  getState: () => X;
  dispatch: (action: Action<X, R>) => void;
};

export function Actor<X, R extends Reducer<X>>(
  reducer: R,
  init: X,
): Actor<X, R> {
  let state = init;
  return {
    getState() {
      return state;
    },
    dispatch(action: Action<X, R>) {
      state = apply(state, action, reducer);
    },
  };
}
