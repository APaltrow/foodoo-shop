import React from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./icon.module.scss";

export const CustomIcon = ({ type, icon, action }) => {
  return (
    <div className={style[type]} onClick={action}>
      {generateIcon(icon)}
    </div>
  );
};
