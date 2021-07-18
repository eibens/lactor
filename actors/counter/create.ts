import { State } from "./state.ts";

export function create(): State {
  return {
    value: 0,
    listener: {
      change: () => {},
    },
  };
}
