import React, { FC } from "react";

import { Footer, Header } from ".";
import { ScrollTop } from "../Components";

import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

import style from "./Layouts.module.scss";

interface IMainLayout {
  children: any;
}

type TAuth = { isAuth: boolean };

export const MainLayout: FC<IMainLayout> = ({ children }) => {
  const { isAuth }: TAuth = useSelector(getAuthState);

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
