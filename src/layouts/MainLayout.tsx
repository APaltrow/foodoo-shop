import React, { FC, useState, useEffect } from "react";

import { Footer, Header } from ".";
import { ScrollTop } from "../Components";

import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";

import style from "./Layouts.module.scss";

interface MainLayoutProps {
  children: any;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  //@ts-ignore
  const { isAuth } = useSelector(getAuthState);
  const [scrollTop, setScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleSroll = () => {
      window.scrollY > 200 ? setScrollTop(true) : setScrollTop(false);
    };

    window.addEventListener("scroll", handleSroll);

    return () => window.removeEventListener("scroll", handleSroll);
  }, []);

  return (
    <div className={style.wrapper_main}>
      <div className={style.content}>
        {isAuth && <Header />}
        <main className={style.content_wrapper}>
          {children}
          {scrollTop && <ScrollTop />}
        </main>
        {isAuth && <Footer />}
      </div>
    </div>
  );
};
