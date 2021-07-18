import { State } from "./state.ts";

export function set(state: State, value: number) {
  const { dom, value: prevValue } = state;
  if (value === prevValue) return;
  state.value = value;
  const output = String(Math.round(value));
  dom.innerHTML = output;
}

export function reset(state: State) {
  set(state, 0);
  state.dom.style.background = "gray";
}

export function increment(state: State) {
  set(state, state.value + 1);
  state.dom.style.background = "transparent";
}
