import React, { FC, useState } from "react";

import { useAppSelector } from "../Hooks/storeHooks";
import { getCartState } from "../Redux/Slices/cartSlice";

import { EmptyCart, Checkout, CartItems } from "../Components";

const CartPage: FC = () => {
  const { totalCount } = useAppSelector(getCartState);

  const [isCheckout, setCheckout] = useState(false);

  if (isCheckout) {
    return <Checkout onCancel={setCheckout} />;
  }
  return (
    <>{totalCount ? <CartItems checkout={setCheckout} /> : <EmptyCart />}</>
  );
};

export default CartPage;
