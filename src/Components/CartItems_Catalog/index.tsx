import React, { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../Hooks/storeHooks";
import { getCartState, clearCart } from "../../Redux/Slices/cartSlice";

import { CustomButton, CartItem } from "..";
import { PageLayout } from "../../layouts";

import style from "./CartItemsCatalog.module.scss";

interface ICartCatalog {
  checkout: (arg: boolean) => void;
}

export const CartItems: FC<ICartCatalog> = ({ checkout }) => {
  const dispatch = useAppDispatch();

  const { totalCount, totalCost, products, discount } =
    useAppSelector(getCartState);

  const onClearCart = () => {
    window.confirm("Are you sure you want to clear your orders?") &&
      dispatch(clearCart());
  };
  const onCheckout = () => {
    checkout(true);
  };

  return (
    <PageLayout img={"basket"} title="Cart" type="list">
      <section className={style.cartItems_container}>
        {products.map((item, i) => (
          <CartItem data={item} key={item.id + i} />
        ))}
      </section>
      <section className={style.cart_totals}>
        <p>
          Total products:<span>{totalCount}</span>
        </p>
        <p>
          Total cost :<span>$ {totalCost}</span>
        </p>
        <p>
          Discount :<span>$ {discount}</span>
        </p>
      </section>
      <section className={style.cart_buttons}>
        <CustomButton type={"goBack"} />
        <CustomButton
          icon={"delete"}
          type={"delete"}
          text={"Remove all"}
          action={onClearCart}
        />
        <CustomButton icon={"wallet"} text={"check out"} action={onCheckout} />
      </section>
    </PageLayout>
  );
};
