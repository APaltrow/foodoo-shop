import React, { FC } from "react";

import { generateIcon } from "../Icons/Icons";
import { useNavigate } from "react-router-dom";

import style from "./CustomButton.module.scss";

interface CustomButtonProps {
  id?: string;
  type?: string;
  text?: string;
  icon?: string;
  disabled?: boolean;

  action?: (id?: string) => void;
}

export const CustomButton: FC<CustomButtonProps> = ({
  id,
  type,
  text,
  icon,
  disabled,
  action,
}) => {
  const navigation = useNavigate();
  const onClickBack = () => navigation(-1);
  const onClick = () => {
    if (action) action(id);
  };

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
      onClick={onClick}
    >
      {icon && generateIcon(icon)}
      {text && <span>{text}</span>}
    </button>
  );
};
