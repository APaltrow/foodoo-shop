import React from "react";
import CustomButton from "../CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";
import { useNavigate } from "react-router-dom";

import CartItem from "../Cart_Item";

import style from "./CartItemsCatalog.module.scss";

function CartItems() {
  const { totalCount, totalCost, products } = useSelector(getCartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickBack = () => navigate(-1);

  const onClearCart = () => {
    window.confirm("Are you sure you want to clear your orders?") &&
      dispatch(clearCart());
  };

  return (
    <div className={style.cartItems}>
      <h2>Cart</h2>
      <CustomButton
        icon={"delete"}
        type={"delete"}
        text={"Remove all"}
        action={onClearCart}
      />
      <div className={style.cartItems_container}>
        {products.map((item, i) => (
          <CartItem data={item} key={item.id + i} />
        ))}
      </div>
      <div className={style.total}>
        <span>
          <strong>Total Cost :</strong> $ {totalCost}
        </span>
        <span>
          <strong>Total :</strong> {totalCount}
        </span>
        <span>
          <strong>Discount :</strong> 0
        </span>
      </div>
      <div className={style.cartItems_btns}>
        <CustomButton icon={"return"} text={"go back"} action={onClickBack} />
        <CustomButton icon={"wallet"} text={"check out"} />
      </div>
    </div>
  );
}

export default CartItems;
