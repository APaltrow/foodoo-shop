import { FC } from "react";

import { generateIcon } from "../Icons/Icons";

import style from "./Loader.module.scss";

export const Loader: FC = () => {
  return (
    <div className={style.loader}>
      <div>{generateIcon("loader")}</div>
      <span>Loading ...</span>
    </div>
  );
};
