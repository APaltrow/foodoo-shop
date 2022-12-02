import React, { FC } from "react";

import { Sort, Search, NavbarItem } from "../Components";

import style from "./Layouts.module.scss";

export const Navbar: FC = () => {
  return (
    <nav className={style.navbar}>
      <div className={style.items}>
        <NavbarItem />
        <Search />
      </div>
      <Sort />
    </nav>
  );
};
