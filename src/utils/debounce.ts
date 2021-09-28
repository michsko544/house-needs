export const debounce = (
  callback: (args: any) => any,
  wait: number
): (() => void) => {
  //
  let timeoutId: number | null = null;
  return (...args) => {
    window.clearTimeout(timeoutId as number | undefined);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args as any);
    }, wait);
  };
};
