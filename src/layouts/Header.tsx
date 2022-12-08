import { FC } from "react";

import { NavLink } from "react-router-dom";

import { setLogOut, useAppDispatch } from "../Redux";

import { Profile, Logo, CustomIcon, Cart } from "../Components";

import style from "./Layouts.module.scss";

export const Header: FC = () => {
  const dispatch = useAppDispatch();

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
          <CustomIcon type="small" icon="logout" action={handleLogout} />
        </div>
      </div>
    </header>
  );
};
