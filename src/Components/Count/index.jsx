import React from "react";
import Icon from "../CustomIcon";
import { useNavigate } from "react-router-dom";

import style from "./Count.module.scss";

const Count = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className={style.count} onClick={() => navigate("/cart")}>
      <Icon icon={"cart"} type={"count"} />
      <span> {data}</span>
    </div>
  );
};

export default Count;
