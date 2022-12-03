import React, { FC } from "react";

import { Error } from "..";

import { generateIcon } from "../Icons/Icons";
import { INPUT_VALIDATIONS } from "../../constants/InputValidations";
import { useInput } from "../../Hooks/useInput";

import style from "./CustomInput.module.scss";

interface CustomInputProps {
  type: string;
  placeholder: string;
  name: string;
  id: string;
}

export const CustomInput: FC<CustomInputProps> = ({
  type,
  placeholder,
  name,
  id,
}) => {
  //@ts-ignore
  const validations = INPUT_VALIDATIONS[type];
  const { value, isDirty, onChange, onBlur, isError } = useInput(validations);

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={id}>
        <div className={style.icon}> {generateIcon(name)}</div>
        <input
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          id={id}
          value={value}
          data-valid={!isError}
          type={type}
          name={name}
          placeholder={placeholder}
          className={
            isDirty && isError ? style.custom_input_invalid : style.custom_input
          }
          autoComplete="off"
        />

        {isDirty && !isError && generateIcon("checkmark")}
      </label>
      {isDirty && isError && <Error error={`${isError}`} />}
    </div>
  );
};
