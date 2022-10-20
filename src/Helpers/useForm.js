import React, { useState, useEffect } from "react";
import { form_types } from "../constants/FormTypes";

import useAuthentication from "./useAuthentication";

export const useForm = (type) => {
  const [inputs, setInputs] = useState(form_types[type]);
  const [validInputs, setValidInputs] = useState([]);
  const [formValid, setFormValid] = useState(false);

  const { formError, isLoading, authenticate } = useAuthentication(
    type,
    validInputs
  );
  const onInputChange = (name, val, error) => {
    const prevValidInputs = validInputs.filter((input) => input.name !== name);
    if (error) {
      setFormValid(false);
      setValidInputs(prevValidInputs);
    } else {
      setValidInputs([...prevValidInputs, { name: name, value: val }]);
    }
  };
  /// registration log
  const onFormSubmit = (e) => {
    e.preventDefault();
    setFormValid(false);
    authenticate(validInputs);
    setFormValid(true);
  };

  useEffect(() => {
    if (validInputs.length === inputs.length) {
      setFormValid(true);
    }
  }, [validInputs]);

  return {
    inputs,
    formValid,
    onInputChange,
    onFormSubmit,
    formError,
    isLoading,
  };
};
