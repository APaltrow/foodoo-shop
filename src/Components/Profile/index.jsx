import React from "react";
import Dropdown from "../Dropdown";
import Icon from "../CustomIcon";
import { Settings } from "../../constants/Constants";

import { useNavigate } from "react-router-dom";
import { useToggle } from "../../Helpers/useToggle";

import style from "./Profile.module.scss";

function Profile() {
  const [isVisible, ref, toggle] = useToggle();

  const navigate = useNavigate();
  const getId = (id) => navigate(`/${Settings[id].route}`);

  return (
    <div className={style.profile} onClick={toggle} ref={ref}>
      <Icon type={"mid"} icon={"profile"} />

      {isVisible && <Dropdown data={Settings} getId={getId} />}
    </div>
  );
}

export default Profile;
