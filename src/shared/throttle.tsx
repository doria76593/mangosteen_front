export const throttle = (func: Function, delay: number) => {
  let timer: number | null = null;
  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};
