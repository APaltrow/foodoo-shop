import React from "react";
import IMG from "../IMG";
import CustomButton from "../CustomButton";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  plusProduct,
  minusProduct,
} from "../../Redux/Slices/cartSlice";

import style from "./CartItem.module.scss";

function CartItem({ data }) {
  const { imgURL, title, activeSize, id, count } = data;
  const dispatch = useDispatch();

  const item = { id, activeSize };
  const onRemoveItem = () => {
    if (window.confirm("Are you sure you want to remove the item?")) {
      dispatch(removeProduct(item));
    }
  };
  const onPlusItem = () => dispatch(plusProduct(item));
  const onMinusItem = () => dispatch(minusProduct(item));

  return (
    <div className={style.cart_item}>
      <div className={style.cart_item_description}>
        <IMG {...data} type={"small"} />

        <div className={style.cart_item_description_title}>
          <h3>{title}</h3>
          <span>{activeSize.size}</span>
        </div>
      </div>
      <div className={style.cart_item_setting}>
        <CustomButton
          text={"-"}
          type={"service"}
          disabled={count <= 1 ? true : false}
          action={onMinusItem}
        />
        <strong>{count}</strong>

        <CustomButton text={"+"} type={"service"} action={onPlusItem} />
        <strong>${activeSize.price}</strong>
        <CustomButton icon={"delete"} type={"delete"} action={onRemoveItem} />
      </div>
    </div>
  );
}
export default CartItem;
