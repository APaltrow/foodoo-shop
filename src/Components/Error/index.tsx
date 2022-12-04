import React, { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Error.module.scss";

type ErrorTypes = { error: string };

export const Error: FC<ErrorTypes> = ({ error }) => {
  return (
    <div className={style.error}>
      {generateIcon("error")}
      {error}
    </div>
  );
};
