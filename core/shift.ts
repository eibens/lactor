export type Shift<T extends [unknown, ...unknown[]]> = T extends
  [unknown, ...infer R] ? R
  : never;
