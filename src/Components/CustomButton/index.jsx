import React from "react";

import { generateIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

import style from "./CustomButton.module.scss";

const CustomButton = ({ id, type, text, action, icon, disabled }) => {
  const navigation = useNavigate();
  const onClickBack = () => navigation(-1);

  if (type === "goBack") {
    return (
      <button className={style.custom} onClick={onClickBack}>
        {generateIcon("return")}
        <span>GO BACK</span>
      </button>
    );
  }
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
};

export default CustomButton;
