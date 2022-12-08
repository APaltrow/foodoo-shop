import { FC } from "react";

import { CustomIcon } from "..";

import style from "./Logo.module.scss";

export const Logo: FC = () => {
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
