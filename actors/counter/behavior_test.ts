import { assertEquals } from "https://deno.land/std@0.100.0/testing/asserts.ts";
import { change, increment, reset, set } from "./behavior.ts";
import { create } from "./create.ts";

Deno.test("change changes value", () => {
  const state = { ...create(), value: 0 };
  change(state, 42);
  assertEquals(state.value, 42);
});

Deno.test("set changes value", () => {
  const state = { ...create(), value: 0 };
  set(state, 42);
  assertEquals(state.value, 42);
});

Deno.test("listener is triggered on change", async () => {
  await new Promise<void>((resolve) => {
    const state = {
      ...create(),
      listener: {
        value: 0,
        change: (value: number) => {
          assertEquals(value, 42);
          resolve();
        },
      },
    };
    set(state, 42);
  });
});

Deno.test("listener is not triggered on same value", async () => {
  await new Promise<void>((resolve) => {
    const state = {
      ...create(),
      listener: {
        value: 42,
        change: () => resolve(),
      },
    };
    set(state, 42);
  });
});

Deno.test("increment adds 1", () => {
  const state = { ...create(), value: 41 };
  increment(state);
  assertEquals(state.value, 42);
});

Deno.test("reset sets to 0", () => {
  const state = { ...create(), value: 42 };
  reset(state);
  assertEquals(state.value, 0);
});
