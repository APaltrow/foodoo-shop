import React, { FC } from "react";
import { CustomIcon } from "..";
import { useNavigate } from "react-router-dom";
import { useCurrentProductCount } from "../../Hooks/useCurrentProductCount";

import style from "./Count.module.scss";

type TCountProps = { id: string };

export const Count: FC<TCountProps> = ({ id }) => {
  const { productCount } = useCurrentProductCount(id);
  const navigate = useNavigate();

  return productCount ? (
    <div className={style.count} onClick={() => navigate("/cart")}>
      <CustomIcon icon={"cart"} type={"count"} />
      <span> {productCount}</span>
    </div>
  ) : null;
};
