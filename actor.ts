import { objectFromReducer, reducerFromObject } from "./reducer.ts";

export type Callback<M extends unknown[]> = (
  ...message: M
) => unknown | Promise<unknown>;

export function actorFromReducer<M extends unknown[]>(
  send: Callback<M>,
): Callback<M> {
  const queue: M[] = [];
  let running = false;

  async function next() {
    running = true;
    const message = queue.shift();
    if (message !== undefined) {
      await send(...message);
      await next();
    } else {
      running = false;
    }
  }

  return async (...message) => {
    queue.push(message);
    if (!running) await next();
  };
}

export function actorFromObject<A>(actor: A): A {
  const reducer = reducerFromObject(actor);
  const queue = actorFromReducer(reducer);
  const keys = Object.keys(actor) as (keyof A)[];
  return objectFromReducer(keys, queue);
}
