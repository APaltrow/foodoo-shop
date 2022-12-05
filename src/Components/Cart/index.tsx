import React, { FC } from "react";

import { CustomIcon } from "..";

import { useAppSelector } from "../../Hooks/storeHooks";
import { getCartState } from "../../Redux/Slices/cartSlice";

import style from "./Cart.module.scss";

export const Cart: FC = () => {
  const { totalCount, totalCost } = useAppSelector(getCartState);

  return (
    <div className={style.nav_cart}>
      <CustomIcon type={"mid"} icon={"cart"} />
      <div className={totalCount ? style.nav_cart_pricetag : style.none}>
        <div className={style.nav_cart_cost}>$ {totalCost.toFixed(2)} </div>
        <div className={style.nav_cart_count}>{totalCount}</div>
      </div>
    </div>
  );
};
