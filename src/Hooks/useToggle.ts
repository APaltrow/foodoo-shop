import { useState, useRef, useEffect } from "react";

//@ts-ignore

//type RefElement = HTMLDivElement | HTMLLabelElement;

type RefType = React.RefObject<HTMLDivElement>;

type ToggleFN = () => void;

type ToggleType = () => [boolean, RefType, ToggleFN];

export const useToggle: ToggleType = () => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggle: ToggleFN = () => setVisible(!isVisible);

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
