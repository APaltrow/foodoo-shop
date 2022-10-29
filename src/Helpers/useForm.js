import React, { useState, useRef } from "react";
import { form_types } from "../constants/FormTypes";

import useAuthentication from "./useAuthentication";

export const useForm = (type) => {
  const formRef = useRef();
  const [inputs, setInputs] = useState(form_types[type]);
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
    setFormValid(false);
    authenticate(credentials);
    formRef.current.reset();
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
