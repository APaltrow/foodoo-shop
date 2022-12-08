import React, { FC, useState, useEffect } from "react";

import { useAppSelector, getAuthState } from "../Redux";

import { Footer, Header } from ".";

import { ScrollTop } from "../Components";

import style from "./Layouts.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { isAuth } = useAppSelector(getAuthState);
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
