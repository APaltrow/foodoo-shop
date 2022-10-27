import React from "react";

import CustomButton from "../CustomButton";
import emptyBasket from "../../assets/emptyBasket.png";

import style from "./EmptyCart.module.scss";

function EmptyCart() {
  return (
    <div className={style.empty_cart}>
      <h2>Your cart is empty</h2>
      <p>Woow, Looks like you have not ordered anything yet...</p>

      <div className={style.empty_cart_img}>
        <img src={emptyBasket} alt="Empty Cart" />
      </div>

      <CustomButton type={"goBack"} />
    </div>
  );
}

export default EmptyCart;
