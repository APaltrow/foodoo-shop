import React from "react";

import Dropdown from "../Dropdown";
import Icon from "../CustomIcon";

import { SETTINGS } from "../../constants/Settings";

import { useNavigate } from "react-router-dom";
import { useToggle } from "../../Hooks/useToggle";

import style from "./Profile.module.scss";

function Profile() {
  const [isVisible, ref, toggle] = useToggle();

  const navigate = useNavigate();
  const getId = (id) => navigate(`/${SETTINGS[id].route}`);

  return (
    <div className={style.nav_profile} onClick={toggle} ref={ref}>
      <Icon type={"mid"} icon={"profile"} />

      {isVisible && <Dropdown data={SETTINGS} getId={getId} />}
    </div>
  );
}

export default Profile;
