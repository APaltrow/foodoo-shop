import React from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Error.module.scss";

export const Error = ({ error }) => {
  return (
    <div className={style.error}>
      {generateIcon("error")}
      {error}
    </div>
  );
};
