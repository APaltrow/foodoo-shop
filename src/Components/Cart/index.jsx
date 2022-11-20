import React from "react";
import { CustomIcon } from "../../Components";
import { useSelector } from "react-redux";
import { getCartState } from "../../Redux/Slices/cartSlice";

import style from "./Cart.module.scss";

export const Cart = () => {
  const { totalCount, totalCost } = useSelector(getCartState);

  return (
    <div className={style.nav_cart}>
      <CustomIcon type={"mid"} icon={"cart"} />
      <div className={totalCount ? style.nav_cart_pricetag : style.none}>
        <div className={style.nav_cart_cost}>$ {totalCost} </div>
        <div className={style.nav_cart_count}>{totalCount}</div>
      </div>
    </div>
  );
};
