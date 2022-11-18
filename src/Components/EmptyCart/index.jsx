import React from "react";

import CustomButton from "../CustomButton";

import { IMG_URL } from "../../constants/ImgURL";

import style from "./EmptyCart.module.scss";

const EmptyCart = () => {
  return (
    <div className={style.empty_cart}>
      <h2>Your cart is empty</h2>
      <p>Woow, looks like you have not ordered anything yet...</p>

      <div className={style.empty_cart_img}>
        <img src={IMG_URL["cart"]} alt="Empty Cart" />
      </div>

      <CustomButton type={"goBack"} />
    </div>
  );
};

export default EmptyCart;
