import React, { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./icon.module.scss";

interface ICustomIcon {
  type: string;
  icon: string;
  action?: () => void;
}

export const CustomIcon: FC<ICustomIcon> = ({ type, icon, action }) => {
  return (
    <div className={style[type]} onClick={action}>
      {generateIcon(icon)}
    </div>
  );
};
