import React from "react";

import { CustomIcon } from "../../Components";

import style from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={style.logo}>
      <CustomIcon type={"big"} icon={"logo"} />
      <div className={style.logo_text}>
        <h1>FOODOO</h1>
        <p>Always servs the best</p>
      </div>
    </div>
  );
};
