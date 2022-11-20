import React from "react";

import { Dropdown, CustomIcon } from "../../Components";

import { SETTINGS } from "../../constants/Settings";

import { useNavigate } from "react-router-dom";
import { useToggle } from "../../Hooks/useToggle";

import style from "./Profile.module.scss";

export const Profile = () => {
  const [isVisible, ref, toggle] = useToggle();

  const navigate = useNavigate();
  const getId = (id) => navigate(`/${SETTINGS[id].route}`);

  return (
    <div className={style.nav_profile} onClick={toggle} ref={ref}>
      <CustomIcon type={"mid"} icon={"profile"} />

      {isVisible && <Dropdown data={SETTINGS} getId={getId} />}
    </div>
  );
};
