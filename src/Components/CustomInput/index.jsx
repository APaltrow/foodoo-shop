import React from "react";

import Error from "../Error";

import { generateIcon } from "../Icons/Icons";
import { INPUT_VALIDATIONS } from "../../constants/InputValidations";
import { useInput } from "../../Hooks/useInput";

import style from "./CustomInput.module.scss";

const CustomInput = ({ type, placeholder, name }) => {
  const { value, isDirty, onChange, onBlur, isError } = useInput(
    INPUT_VALIDATIONS[type]
  );

  return (
    <div className={style.container}>
      <label className={style.label}>
        <div className={style.icon}> {generateIcon(name)}</div>
        <input
          data-valid={!isError}
          className={
            isDirty && isError ? style.custom_input_invalid : style.custom_input
          }
          onChange={(e) => onChange(e)}
          onBlur={onBlur}
          value={value}
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete="off"
        />

        {isDirty && !isError && generateIcon("checkmark")}
      </label>
      {isDirty && isError && <Error error={isError} />}
    </div>
  );
};

export default CustomInput;
