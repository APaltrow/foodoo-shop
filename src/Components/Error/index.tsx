import React, { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Error.module.scss";

type TError = { error: string };

export const Error: FC<TError> = ({ error }) => {
  return (
    <div className={style.error}>
      {generateIcon("error")}
      {error}
    </div>
  );
};
