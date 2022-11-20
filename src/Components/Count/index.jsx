import React from "react";
import { CustomIcon } from "../../Components";
import { useNavigate } from "react-router-dom";
import { useCurrentProductCount } from "../../Hooks/useCurrentProductCount";

import style from "./Count.module.scss";

export const Count = ({ id }) => {
  const { productCount } = useCurrentProductCount(id);
  const navigate = useNavigate();

  return productCount ? (
    <div className={style.count} onClick={() => navigate("/cart")}>
      <CustomIcon icon={"cart"} type={"count"} />
      <span> {productCount}</span>
    </div>
  ) : null;
};
