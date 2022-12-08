import { useState } from "react";
import { InputValidations } from "../constants/InputValidations";
import { useValidation } from "./useValidation";

type InputFN = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const useInput = (validations: InputValidations) => {
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
