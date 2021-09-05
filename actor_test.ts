import { delay } from "https://deno.land/std@0.106.0/async/delay.ts";
import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { actorFromObject, actorFromReducer } from "./actor.ts";

Deno.test("actorFromReducer", async () => {
  const result: number[] = [];
  const reducer = async (n: number) => {
    result.push(n);
    await delay(100);
    result.push(n);
  };
  const queue = actorFromReducer(reducer);
  await Promise.all([queue(1), queue(2), queue(3)]);
  assertEquals(result, [1, 1, 2, 2, 3, 3]);
});

Deno.test("actorFromObject works", () => {
  class Flag {
    value = false;
    set() {
      this.value = true;
    }
  }
  const flag = new Flag();
  const actor = actorFromObject(flag);
  actor.set();
  assertEquals(flag.value, true);
});

Deno.test("actorFromObject throws for invalid message", () => {
  class Empty {
  }
  const empty = new Empty() as { set(): Promise<void> };
  const actor = actorFromObject(empty);
  assertThrowsAsync(async () => {
    await actor.set();
  }, Error);
});
