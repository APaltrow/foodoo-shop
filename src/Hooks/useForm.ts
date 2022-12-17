import React, { useState, useRef } from "react";
import { FormTypesList, FORM_TYPES } from "../constants/FormTypes";

import { Credentials, useAuthentication } from "./useAuthentication";

export type ValidInput = Credentials | {};

type FormFunctions = (e?: React.FormEvent<EventTarget>) => void;

export type FormElements = HTMLFormControlsCollection & HTMLInputElement[];

export const useForm = (type: FormTypesList) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [inputs, setInputs] = useState(FORM_TYPES[type]);
  const [credentials, setCredentials] = useState<ValidInput>({});
  const [formValid, setFormValid] = useState(false);
  const { formError, authenticate, status } = useAuthentication(type);

  const checkIfValidForm: FormFunctions = () => {
    const validInputsList: ValidInput[] = [];
    const formInputs: HTMLInputElement[] = formRef?.current
      ?.elements as FormElements;

    if (formRef.current) {
      for (let input of formInputs) {
        if (input.getAttribute("data-valid") === "true") {
          validInputsList.push([input.name, input.value]);
        }
      }
    }

    inputs.length === validInputsList.length
      ? setFormValid(true)
      : setFormValid(false);
    //@ts-ignore
    setCredentials(Object.fromEntries(validInputsList));
  };

  const onFormSubmit: FormFunctions = (e) => {
    if (e && formValid) {
      e.preventDefault();

      setFormValid(false);
      authenticate(credentials as Credentials);
      setFormValid(true);
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
