/// <reference lib="dom"/>

import { State } from "./state.ts";

export function create(): State {
  const dom = document.createElement("b") as HTMLElement;
  dom.innerHTML = "-";
  dom.style.fontSize = "100px";
  dom.style.background = "gray";
  dom.style.fontFamily = '"JetBrains Mono", monospace';
  return {
    dom,
    value: 0,
  };
}
