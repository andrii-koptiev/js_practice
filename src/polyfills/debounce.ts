export const debounce = (callback: Function, waitTime: number) => {
  let timer: NodeJS.Timeout;

  return function (...args: any[]) {
    const callContext = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(callContext, args);
    }, waitTime);
  };
};
