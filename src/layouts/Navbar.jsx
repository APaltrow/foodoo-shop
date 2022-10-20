import React from "react";
import NavbarItem from "../Components/Navbar_Item";
import Search from "../Components/Search";
import Sort from "../Components/Sort";

import style from "./Layouts.module.scss";

function Navbar() {
  return (
    <nav className={style.navbar}>
      <div className={style.items}>
        <NavbarItem />
        <Search />
      </div>
      <Sort />
    </nav>
  );
}

export default Navbar;
