import { useCallback, useRef } from 'react';

function useDebounceCallback<T extends Array<any>>(
  callback: (...args: T) => void,
  delay: number,
): any {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      const timeout = setTimeout(() => {
        callback(...args);
      }, delay);
      timer.current = timeout;
    },
    [callback, delay],
  );

  return debouncedCallback;
}

export default useDebounceCallback;
