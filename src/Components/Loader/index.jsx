import React from "react";
import { generateIcon } from "../Icons/Icons";

import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={style.loader}>
      <div>{generateIcon("loader")}</div>
      <span>Loading ...</span>
    </div>
  );
};

export default Loader;
