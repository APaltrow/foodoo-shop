import React from "react";
import { generateIcon } from "../Icons/Icons";

import CustomButton from "../CustomButton";

import style from "./NotFound.module.scss";

const NotFound = ({ page }) => {
  return (
    <div className={style.not_found}>
      {page && <h2>NOT FOUND</h2>}
      <p>Ooops, nothing has been found...</p>
      <div className={style.not_found_icon}>{generateIcon("not-found")}</div>

      {page && <CustomButton type={"goBack"} />}
    </div>
  );
};

export default NotFound;
