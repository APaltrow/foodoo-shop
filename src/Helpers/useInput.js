import { useState } from "react";
import { useValidation } from "./useValidation";

export const useInput = (validations) => {
  const [value, setValue] = useState("");
  const [isDirty, setDirty] = useState(false);
  const { isError } = useValidation(value, validations);

  const onChange = (e) => setValue(e.target.value);
  const onBlur = () => setDirty(true);

  return {
    value,
    isDirty,
    onChange,
    onBlur,
    isError,
  };
};
