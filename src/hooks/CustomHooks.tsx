import { RefObject, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => any
) => {
  useEffect(() => {
    const listner = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current?.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listner);
    document.addEventListener('touchstart', listner);
    return () => {
      document.removeEventListener('mousedown', listner);
      document.removeEventListener('touchstart', listner);
    };
  }, [ref, handler]);
};
