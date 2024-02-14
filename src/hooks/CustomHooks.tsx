import { useEffect, useState } from 'react';
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
