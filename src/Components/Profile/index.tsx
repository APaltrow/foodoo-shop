import React, { FC } from "react";

import { Dropdown, CustomIcon } from "..";

import { SETTINGS } from "../../constants/Settings";

import { useNavigate } from "react-router-dom";
import { useToggle } from "../../Hooks/useToggle";

import style from "./Profile.module.scss";

// @ts-ignore
export const Profile: FC = () => {
  const navigate = useNavigate();
  const [isVisible, ref, toggle] = useToggle();

  const getId = (id: number) => navigate(`/${SETTINGS[id].route}`);

  return (
    <div className={style.nav_profile} onClick={toggle} ref={ref}>
      <CustomIcon type={"mid"} icon={"profile"} />

      {isVisible && <Dropdown data={SETTINGS} getId={getId} />}
    </div>
  );
};
