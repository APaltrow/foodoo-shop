import React from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./icon.module.scss";

const Icon = ({ type, icon, action }) => {
  return (
    <div className={style[type]} onClick={action}>
      {generateIcon(icon)}
    </div>
  );
};

export default Icon;
