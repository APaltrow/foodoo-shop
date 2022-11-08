import React, { useState, useRef } from "react";
import { FORM_TYPES } from "../constants/FormTypes";

import useAuthentication from "./useAuthentication";

export const useForm = (type) => {
  const formRef = useRef();
  const [inputs, setInputs] = useState(FORM_TYPES[type]);
  const [credentials, setCredentials] = useState({});
  const [formValid, setFormValid] = useState(false);
  const { formError, authenticate, status } = useAuthentication(type);

  const generateCredentials = (validInputsList) => {
    const credentials = {};
    validInputsList.map((input) => Object.assign(credentials, input));
    return credentials;
  };
  const checkIfValidForm = () => {
    const validInputsList = [];
    for (let input of formRef.current.elements) {
      input.defaultChecked &&
        validInputsList.push({ [input.name]: input.value });
    }
    inputs.length === validInputsList.length
      ? setFormValid(true)
      : setFormValid(false);
    setCredentials(generateCredentials(validInputsList));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
      setFormValid(false);
      authenticate(credentials);
      setFormValid(true);
    }
  };

  return {
    inputs,
    formValid,
    onFormSubmit,
    formError,
    formRef,
    checkIfValidForm,
    status,
  };
};
