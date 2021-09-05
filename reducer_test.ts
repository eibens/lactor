import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.106.0/testing/asserts.ts";
import { objectFromReducer, reducerFromObject } from "./reducer.ts";

Deno.test("reducerFromObject delegates messages", () => {
  let value = 0;
  const reducer = reducerFromObject({
    inc() {
      value++;
    },
  });
  reducer("inc");
  reducer("inc");
  assertEquals(value, 2);
});

Deno.test("reducerFromObject throws if message does not exist", () => {
  assertThrowsAsync(
    async () => {
      const reducer = reducerFromObject({});
      await reducer("foo" as never);
    },
    Error,
    `unknown message "foo"`,
  );
});

Deno.test("reducerFromObject binds function", () => {
  class Counter {
    value = 0;
    inc() {
      this.value++;
    }
  }
  const counter = new Counter();
  const reducer = reducerFromObject(counter);
  reducer("inc");
  assertEquals(counter.value, 1);
});

Deno.test("objectFromReducer adds all keys", () => {
  const obj = objectFromReducer(["foo", "bar"], (_key, ..._) => {
    throw new Error();
  });
  assertEquals(Object.keys(obj), ["foo", "bar"]);
});

Deno.test("objectFromReducer delegates messages", () => {
  let value = 0;
  const obj = objectFromReducer<{ inc(): void }>(
    ["inc"],
    (key, ..._) => {
      if (key === "inc") value++;
    },
  );
  obj.inc();
  obj.inc();
  assertEquals(value, 2);
});
