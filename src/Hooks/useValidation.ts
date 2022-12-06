import { useState, useEffect } from "react";
import { InputValidations } from "../constants/InputValidations";

type ValidationsType = (
  value: string,
  validations: InputValidations
) => { isError: boolean | string };

//@ts-ignore

export const useValidation: ValidationsType = (value, validations) => {
  const [isEmpty, setEmpty] = useState<boolean | string>(true);
  const [minLengthError, setMinLengthError] = useState<boolean | string>(true);
  const [maxLengthError, setMaxLengthError] = useState<boolean | string>(false);
  const [emailError, setEmailError] = useState<boolean | string>(false);

  const [isError, setError] = useState<boolean | string>(true);

  const validate = () => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(`Field cannot be empty`);
          break;
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthError(`Min length ${validations[validation]}`)
            : setMinLengthError(false);
          break;
        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthError(`Max length ${validations[validation]}`)
            : setMaxLengthError(false);
          break;
        case "isEmail":
          const validator =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          validator.test(String(value).toLowerCase())
            ? setEmailError(false)
            : setEmailError("Invalid email");
          break;

        default:
          return null;
      }
    }
  };
  useEffect(() => {
    validate();
  }, [value]);

  useEffect(() => {
    const error = () =>
      isEmpty || minLengthError || maxLengthError || emailError;

    setError(error);
  }, [isEmpty, minLengthError, maxLengthError, emailError]);

  return {
    isError,
  };
};
