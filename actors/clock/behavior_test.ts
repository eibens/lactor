import { assert } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { start, stop } from "./behavior.ts";
import { State } from "./state.ts";
import { create } from "./create.ts";

Deno.test("start sets timeout", () => {
  const state = create();
  start(state);
  assert(state.timeout !== null);
  stop(state);
});

Deno.test("stop clears timeout", () => {
  const state = create();
  start(state);
  stop(state);
  assert(state.timeout === null);
});

Deno.test("runs for longer than a second", () => {
  return new Promise<void>((resolve) => {
    const state = create();
    start(state);
    setTimeout(() => {
      stop(state);
      resolve();
    }, 1100);
  });
});

Deno.test("tick is called after a second passes", () => {
  return new Promise<void>((resolve) => {
    const state: State = {
      ...create(),
      listener: {
        tick: () => {
          stop(state);
          resolve();
        },
      },
    };
    start(state);
  });
});

Deno.test("tick is not called before a second passes", () => {
  return new Promise<void>((resolve, reject) => {
    const state: State = {
      ...create(),
      listener: {
        tick: () => {
          reject();
        },
      },
    };
    start(state);
    setTimeout(() => {
      stop(state);
      resolve();
    }, 900);
  });
});
