import React from "react";
import { generateIcon } from "../Icons/Icons";
import style from "./CustomButton.module.scss";

function CustomButton({ id, type, text, action, icon, disabled }) {
  return (
    <button
      disabled={disabled}
      className={type ? style[type] : style.custom}
      onClick={action ? () => action(id) : null}
    >
      {icon && generateIcon(icon)}
      {text && <span>{text}</span>}
    </button>
  );
}

export default CustomButton;
