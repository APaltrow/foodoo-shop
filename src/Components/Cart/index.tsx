import React, { FC } from "react";
import { CustomIcon } from "..";
import { useSelector } from "react-redux";
import { getCartState } from "../../Redux/Slices/cartSlice";

import style from "./Cart.module.scss";

interface ICart {
  totalCount: number;
  totalCost: number;
}

export const Cart: FC = () => {
  const { totalCount, totalCost }: ICart = useSelector(getCartState);

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
