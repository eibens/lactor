import { State } from "./state.ts";
import { Clock } from "./deps.ts";

export function render(state: State) {
  Clock.behavior.start(state.clock);
  state.root.appendChild(state.counterView.dom);
}
