import { State } from "./state.ts";

export function start(state: State) {
  if (state.timeout !== null) return;
  state.timeout = setInterval(() => {
    state.listener.tick();
  }, 1000);
}

export function stop(state: State) {
  if (state.timeout === null) return;
  clearInterval(state.timeout);
  state.timeout = null;
}
