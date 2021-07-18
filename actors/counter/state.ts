export type State = {
  value: number;
  listener: {
    change: (value: number) => void;
  };
};
