import React, { useState } from "react";

import { useSelector } from "react-redux";
import { getCartState } from "../Redux/Slices/cartSlice";

import { EmptyCart, Checkout, CartItems } from "../Components";

export const CartPage = () => {
  const { totalCount } = useSelector(getCartState);
  const [isCheckout, setCheckout] = useState(false);

  if (isCheckout) {
    return <Checkout onCancel={setCheckout} />;
  }
  return (
    <>{totalCount ? <CartItems checkout={setCheckout} /> : <EmptyCart />}</>
  );
};
