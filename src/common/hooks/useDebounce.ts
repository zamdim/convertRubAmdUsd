import { useState, useEffect } from 'react';

export default function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export function useDebounceWithSkip(value: any, delay: number, skip: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setCounter((prev) => prev + 1);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return counter > skip ? debouncedValue : undefined;
}
