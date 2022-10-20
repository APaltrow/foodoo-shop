import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

import style from "./Layouts.module.scss";

const MainLayout = ({ children }) => {
  const { isAuth } = useSelector(getAuthState);
  return (
    <div className={style.wrapper_main}>
      <div className={style.content}>
        {isAuth && <Header />}
        <main className={style.content_wrapper}>{children}</main>
        {isAuth && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;
