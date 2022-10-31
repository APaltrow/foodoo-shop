import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCartState } from "../Redux/Slices/cartSlice";
import EmptyCart from "../Components/EmptyCart";
import CartItems from "../Components/CartItems_Catalog";
import Checkout from "../Components/Checkout";

const CartPage = () => {
  const { totalCount } = useSelector(getCartState);
  const [isCheckout, setCheckout] = useState(false);

  if (isCheckout) {
    return <Checkout onCancel={setCheckout} />;
  }
  return (
    <>{totalCount ? <CartItems checkout={setCheckout} /> : <EmptyCart />}</>
  );
};

export default CartPage;
