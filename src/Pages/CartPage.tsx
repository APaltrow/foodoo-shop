import { FC, useState } from "react";

import { getCartState, useAppSelector } from "../Redux";

import { EmptyCart, Checkout, CartItems } from "../Components";

const CartPage: FC = () => {
  const { totalCount } = useAppSelector(getCartState);

  const [isCheckout, setCheckout] = useState<boolean>(false);

  if (isCheckout) {
    return <Checkout onCancel={setCheckout} />;
  }
  return (
    <>{totalCount ? <CartItems checkout={setCheckout} /> : <EmptyCart />}</>
  );
};

export default CartPage;
