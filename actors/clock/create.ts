import { State } from "./state.ts";

export function create(): State {
  return {
    timeout: null,
    listener: {
      tick: () => {},
    },
  };
}
