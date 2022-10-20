import React from "react";
import Error from "../Error";
import { generateIcon } from "../Icons/Icons";
import { inputValidations } from "../../constants/Constants";
import { useInput } from "../../Helpers/useInput";

import style from "./CustomInput.module.scss";

const CustomInput = ({ type, placeholder, name, onInputChange }) => {
  const { value, isDirty, onChange, onBlur, isError } = useInput(
    inputValidations[type],
    onInputChange,
    name
  );

  return (
    <div className={style.container}>
      <label className={style.label}>
        <div className={style.icon}> {generateIcon(name)}</div>
        <input
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
