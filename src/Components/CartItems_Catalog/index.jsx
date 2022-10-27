import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";

import CartItem from "../Cart_Item";
import CustomButton from "../CustomButton";

import style from "./CartItemsCatalog.module.scss";

function CartItems() {
  const { totalCount, totalCost, products, discount } =
    useSelector(getCartState);
  const dispatch = useDispatch();

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
          <strong>Total :</strong> {totalCount}
        </span>
        <span>
          <strong>Total Cost :</strong> $ {totalCost}
        </span>

        <span>
          <strong>Discount :</strong> $ {discount}
        </span>
      </div>
      <div className={style.cartItems_btns}>
        <CustomButton type={"goBack"} />
        <CustomButton icon={"wallet"} text={"check out"} />
      </div>
    </div>
  );
}

export default CartItems;
