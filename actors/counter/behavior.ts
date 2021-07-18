import { State } from "./state.ts";

export function change(state: State, value: number) {
  state.value = value;
  state.listener.change(value);
}

export function set(state: State, value: number) {
  if (state.value === value) return;
  change(state, value);
}

export function increment(state: State) {
  set(state, state.value + 1);
}

export function reset(state: State) {
  set(state, 0);
}
