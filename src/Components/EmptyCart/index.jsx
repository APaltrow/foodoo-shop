import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import emptyBasket from "../../assets/emptyBasket.png";

import style from "./EmptyCart.module.scss";

function EmptyCart() {
  const navigate = useNavigate();
  const onClickBack = () => navigate(-1);
  return (
    <div className={style.empty_cart}>
      <h2>Your cart is empty</h2>
      <p>Woow, Looks like you have not ordered anything yet...</p>

      <div className={style.empty_cart_img}>
        <img src={emptyBasket} alt="Empty Cart" />
      </div>

      <CustomButton icon={"return"} text={"Go Back"} action={onClickBack} />
    </div>
  );
}

export default EmptyCart;
