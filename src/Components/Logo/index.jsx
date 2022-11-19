import React from "react";

import Icon from "../CustomIcon";

import style from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={style.logo}>
      <Icon type={"big"} icon={"logo"} />
      <div className={style.logo_text}>
        <h1>FOODOO</h1>
        <p>Always servs the best</p>
      </div>
    </div>
  );
};

export default Logo;
