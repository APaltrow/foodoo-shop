import { useState, useEffect } from "react";
import { useValidation } from "./useValidation";

export const useInput = (validations, onInputChange, name) => {
  const [value, setValue] = useState("");
  const [isDirty, setDirty] = useState(false);
  const { isError } = useValidation(value, validations);

  const onChange = (e) => setValue(e.target.value);
  const onBlur = () => setDirty(true);

  useEffect(() => {
    isError === false
      ? onInputChange(name, value)
      : onInputChange(name, value, isError);
  }, [isError, value]);

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    isError,
  };
};
