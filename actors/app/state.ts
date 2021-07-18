/// <reference lib="dom"/>
import { Clock, Counter, CounterView } from "./deps.ts";

export type State = {
  root: HTMLElement;
  clock: Clock.State;
  counter: Counter.State;
  counterView: CounterView.State;
};
