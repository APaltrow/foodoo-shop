import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";

import CartItem from "../Cart_Item";
import CustomButton from "../CustomButton";

import style from "./CartItemsCatalog.module.scss";

const CartItems = ({ checkout }) => {
  const { totalCount, totalCost, products, discount } =
    useSelector(getCartState);
  const dispatch = useDispatch();

  const onClearCart = () => {
    window.confirm("Are you sure you want to clear your orders?") &&
      dispatch(clearCart());
  };
  const onCheckout = () => {
    checkout(true);
  };

  return (
    <div className={style.cartItems}>
      <h2>Cart</h2>
      <div className={style.cartItems_container}>
        {products.map((item, i) => (
          <CartItem data={item} key={item.id + i} />
        ))}
      </div>
      <div className={style.total}>
        <div>
          Total :<span>{totalCount}</span>
        </div>
        <div>
          Total Cost :<span>$ {totalCost}</span>
        </div>
        <div>
          Discount :<span>$ {discount}</span>
        </div>
      </div>
      <div className={style.cartItems_btns}>
        <CustomButton type={"goBack"} />
        <CustomButton
          icon={"delete"}
          type={"delete"}
          text={"Remove all"}
          action={onClearCart}
        />
        <CustomButton icon={"wallet"} text={"check out"} action={onCheckout} />
      </div>
    </div>
  );
};

export default CartItems;
