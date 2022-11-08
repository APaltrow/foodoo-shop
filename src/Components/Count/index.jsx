import React from "react";
import Icon from "../CustomIcon";
import { useNavigate } from "react-router-dom";
import { useCurrentProductCount } from "../../Hooks/useCurrentProductCount";

import style from "./Count.module.scss";

const Count = ({ id }) => {
  const { productCount } = useCurrentProductCount(id);
  const navigate = useNavigate();

  return productCount ? (
    <div className={style.count} onClick={() => navigate("/cart")}>
      <Icon icon={"cart"} type={"count"} />
      <span> {productCount}</span>
    </div>
  ) : null;
};

export default Count;
