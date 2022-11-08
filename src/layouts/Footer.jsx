import React from "react";
import CustomIcon from "../Components/CustomIcon";

import style from "./Layouts.module.scss";

function Footer() {
  return (
    <footer className={style.footer}>
      <b>FOODOO © 2022</b>
      <span>*find me on</span>
      <a href="https://github.com/APaltrow/foodoo-shop" target={"_blank"}>
        <CustomIcon type="small" icon="github" />
      </a>
    </footer>
  );
}

export default Footer;
