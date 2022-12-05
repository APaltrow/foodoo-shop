import React, { FC } from "react";
import { useAppDispatch } from "../../Hooks/storeHooks";

import { IMG, CustomIcon, CustomButton } from "..";

import {
  removeProduct,
  plusProduct,
  minusProduct,
} from "../../Redux/Slices/cartSlice";

import style from "./CartItem.module.scss";
import { IActiveSizeWithDiscount } from "../../Hooks/useDiscount";

{
  /*export interface IActiveSize {
  discountedPrice: number | null;
  savedOnDiscount: number | null;
  nutrition: number;
  price: number;
  weight: number;
  size: string;
}*/
}

export interface ICartItem {
  id: string;
  lot_id: string;
  imgURL: string;
  title: string;
  count: number;

  activeSize: IActiveSizeWithDiscount;
  specialOrder: string[];
}

interface ICartItemProps {
  data: ICartItem;
}

export const CartItem: FC<ICartItemProps> = ({ data }) => {
  const dispatch = useAppDispatch();

  const { imgURL, title, activeSize, id, lot_id, count, specialOrder } = data;

  const onPlusItem = () => dispatch(plusProduct(lot_id));
  const onMinusItem = () => dispatch(minusProduct(lot_id));
  const onRemoveItem = () => {
    if (window.confirm("Are you sure you want to remove the product?")) {
      dispatch(removeProduct(lot_id));
    }
  };

  return (
    <section className={style.cart_item}>
      <div className={style.cart_item_description}>
        <IMG id={id} title={title} imgURL={imgURL} type={"small"} />

        <div className={style.cart_item_description_title}>
          <h3>{title}</h3>
          <span>{activeSize.size}</span>
          <div>
            <b className={activeSize.discountedPrice && style.discount}>
              $ {activeSize.price.toFixed(2)}
            </b>
            {activeSize.discountedPrice && (
              <b> $ {activeSize.discountedPrice.toFixed(2)}</b>
            )}
          </div>
        </div>
      </div>
      {specialOrder.length ? (
        <div className={style.cart_item_specialOreder}>
          <div className={style.cart_item_specialOreder_title}>
            Special order <CustomIcon icon={"special-order"} type={"small"} />
          </div>
          <div className={style.specialOrder_header}>
            <input type={"checkbox"} id={lot_id} />
            <label htmlFor={lot_id}>
              <CustomIcon type={"small"} icon={"arrow"} />
              <div className={style.specialOrder_list}>
                {specialOrder.map((orderS, i) => (
                  <span key={i + 55}>{orderS}</span>
                ))}
              </div>
            </label>
          </div>
        </div>
      ) : null}
      <div className={style.cart_item_buttons}>
        <CustomButton
          text={"-"}
          type={"service"}
          disabled={count <= 1 ? true : false}
          action={onMinusItem}
        />

        <b>{count}</b>

        <CustomButton text={"+"} type={"service"} action={onPlusItem} />

        <CustomButton icon={"delete"} type={"delete"} action={onRemoveItem} />
      </div>
    </section>
  );
};
