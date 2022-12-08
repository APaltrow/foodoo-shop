import { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Error.module.scss";

interface IErrorProps {
  error: string;
}

export const Error: FC<IErrorProps> = ({ error }) => {
  return (
    <div className={style.error}>
      {generateIcon("error")}
      {error}
    </div>
  );
};
