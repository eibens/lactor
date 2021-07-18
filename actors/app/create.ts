import { Clock, Counter, CounterView } from "./deps.ts";
import { State } from "./state.ts";

export function create(): State {
  const counterView = CounterView.create();

  const counter: Counter.State = {
    ...Counter.create(),
    listener: {
      change: (value) => {
        CounterView.behavior.set(counterView, value);
      },
    },
  };

  const clock: Clock.State = {
    ...Clock.create(),
    listener: {
      tick: () => {
        Counter.behavior.increment(counter);
      },
    },
  };

  return {
    root: document.body,
    clock,
    counter,
    counterView,
  };
}
