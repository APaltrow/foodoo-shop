import React, { useState, useRef } from "react";
import { FORM_TYPES } from "../constants/FormTypes";

import { useAuthentication } from "./useAuthentication";

export type ValidInput =
  | {
      [name: string]: string;
    }
  | {};

type ValidInputs = ValidInput[] | [];

type FormFunctions = (e?: React.FormEvent<EventTarget>) => void;

export const useForm = (type: string) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [inputs, setInputs] = useState(FORM_TYPES[type]);
  const [credentials, setCredentials] = useState<ValidInput>({});
  const [formValid, setFormValid] = useState(false);
  const { formError, authenticate, status } = useAuthentication(type);

  const generateCredentials = (validInputsList: ValidInputs) => {
    const credentials: ValidInput = {};
    validInputsList.map((input) => Object.assign(credentials, input));
    return credentials;
  };

  const checkIfValidForm: FormFunctions = () => {
    const validInputsList: ValidInputs = [];
    //@ts-ignore
    for (let input of formRef.current.elements) {
      if (input.getAttribute("data-valid") === "true") {
        //@ts-ignore
        validInputsList.push({ [input.name]: input.value });
      }
    }
    inputs.length === validInputsList.length
      ? setFormValid(true)
      : setFormValid(false);
    setCredentials(generateCredentials(validInputsList));
  };

  const onFormSubmit: FormFunctions = (e) => {
    if (e) {
      e.preventDefault();
      if (formValid) {
        setFormValid(false);
        authenticate(credentials);
        setFormValid(true);
      }
    }
  };

  return {
    inputs,
    formValid,
    formError,
    formRef,
    status,

    checkIfValidForm,
    onFormSubmit,
  };
};
