import { useState, useRef, useEffect } from "react";

type RefType = React.RefObject<HTMLDivElement>;

type ToggleFN = () => void;

type ToggleType = () => [boolean, RefType, ToggleFN];

export const useToggle: ToggleType = () => {
  const [isVisible, setVisible] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const toggle: ToggleFN = () => setVisible(!isVisible);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[];
      };

      if (ref.current && !_event.path.includes(ref.current)) {
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
