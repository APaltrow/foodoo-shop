import { useState } from "react";
import { useValidation } from "./useValidation";

type Validations = {
  [name: string]: string;
};

type InputFN = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useInput = (validations: Validations) => {
  const [value, setValue] = useState<string>("");
  const [isDirty, setDirty] = useState<boolean>(false);
  const { isError } = useValidation(value, validations);

  const onChange: InputFN = (e) => setValue(e.target.value);
  const onBlur: InputFN = () => setDirty(true);

  return {
    value,
    isDirty,
    isError,

    onChange,
    onBlur,
  };
};
