import React from "react";
import { generateIcon } from "../Icons/Icons";

import { CustomButton } from "../../Components";

import style from "./NotFound.module.scss";

export const NotFound = ({ page, message }) => {
  return (
    <div className={style.not_found}>
      {page && <h2>NOT FOUND</h2>}
      {message && <h3>{message}</h3>}
      <p>Ooops, nothing has been found...</p>
      <div className={style.not_found_icon}>{generateIcon("not-found")}</div>

      {page && <CustomButton type={"goBack"} />}
    </div>
  );
};
