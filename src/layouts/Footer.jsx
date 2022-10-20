import React from "react";
import { useSelector } from "react-redux";
import { getAuthState } from "../Redux/Slices/authSlice";

import style from "./Layouts.module.scss";

function Footer() {
  return <footer className={style.footer}>FOOTER !!!</footer>;
}

export default Footer;
