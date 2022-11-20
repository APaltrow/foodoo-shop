import React from "react";

import { Footer, Header } from "../layouts";
import { ScrollTop } from "../Components";

import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

import style from "./Layouts.module.scss";

export const MainLayout = ({ children }) => {
  const { isAuth } = useSelector(getAuthState);

  return (
    <div className={style.wrapper_main}>
      <div className={style.content}>
        {isAuth && <Header />}
        <main className={style.content_wrapper}>
          {children}
          <ScrollTop />
        </main>
        {isAuth && <Footer />}
      </div>
    </div>
  );
};
