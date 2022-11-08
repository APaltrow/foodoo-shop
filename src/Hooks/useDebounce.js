import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debValue, setDebValue] = useState("");

  useEffect(() => {
    if (value !== debValue) {
      if (value === "") {
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
