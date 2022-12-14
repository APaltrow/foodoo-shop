import { FC } from "react";

import { CustomIcon } from "../Components";

import style from "./Layouts.module.scss";

export const Footer: FC = () => {
  return (
    <footer className={style.footer}>
      <b>FOODOO © 2022</b>
      <span>*find me on</span>
      <a href="https://github.com/APaltrow/foodoo-shop" target={"_blank"}>
        <CustomIcon type="small" icon="github" />
      </a>
    </footer>
  );
};
