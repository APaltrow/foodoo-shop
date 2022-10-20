import React from "react";

import { useSelector } from "react-redux";
import { getCartState } from "../Redux/Slices/cartSlice";
import EmptyCart from "../Components/EmptyCart";
import CartItems from "../Components/CartItems_Catalog";

function CartPage() {
  const { totalCount } = useSelector(getCartState);

  return <>{totalCount ? <CartItems /> : <EmptyCart />}</>;
}

export default CartPage;
