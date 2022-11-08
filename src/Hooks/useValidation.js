import { useState, useEffect } from "react";

export const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(true);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const [isError, setError] = useState(true);

  useEffect(() => {
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
