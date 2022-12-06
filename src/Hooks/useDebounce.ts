import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debValue, setDebValue] = useState<string>("");

  useEffect(() => {
    if (value !== debValue) {
      if (!value) {
        setDebValue(value);
      } else {
        const handler = setTimeout(() => {
          setDebValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      }
    }
  }, [value]);

  return [debValue];
};
