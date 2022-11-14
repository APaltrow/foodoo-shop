import React from "react";
import Cart from "../Components/Cart";
import Profile from "../Components/Profile";
import Logo from "../Components/Logo";
import Icon from "../Components/CustomIcon";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogOut } from "../Redux/Slices/authSlice";

import style from "./Layouts.module.scss";

function Header() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    window.confirm("Are you sure you would like to log out?") &&
      dispatch(setLogOut());
  };

  return (
    <header className={style.header}>
      <NavLink to="/">
        <Logo />
      </NavLink>

      <div className={style.profile_wrapper}>
        <NavLink to="/cart">
          <Cart />
        </NavLink>

        <Profile />
        <div className={style.nav_logout}>
          <Icon type="small" icon="logout" action={handleLogout} />
        </div>
      </div>
    </header>
  );
}

export default Header;
