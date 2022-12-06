import { useState, useRef, useEffect } from "react";

//@ts-ignore

type ToggleType = () => [boolean, React.RefObject<HTMLElement>, () => void];

export const useToggle: ToggleType = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

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
