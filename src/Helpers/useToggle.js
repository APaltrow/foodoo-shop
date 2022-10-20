import { useState, useRef, useEffect } from "react";

export const useToggle = () => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef();

  const toggle = () => setVisible(!isVisible);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(ref.current)) {
        setVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return [isVisible, ref, toggle];
};
