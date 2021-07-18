export type State = {
  timeout: number | null;
  listener: {
    tick: () => void;
  };
};
