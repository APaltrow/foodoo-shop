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
  const {
    imgURL,
    title,
    activeSize,
    id,
    lot_id,
    count,
    specialOrder,
    savedOnDiscount,
  } = data;
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    if (window.confirm("Are you sure you want to remove the item?")) {
      dispatch(removeProduct({ lot_id }));
    }
  };
  const onPlusItem = () => dispatch(plusProduct({ lot_id }));
  const onMinusItem = () => dispatch(minusProduct({ lot_id }));

  return (
    <div className={style.cart_item}>
      <div className={style.cart_item_description}>
        <IMG {...data} type={"small"} />

        <div className={style.cart_item_description_title}>
          <h3>{title}</h3>
          <span>{activeSize.size}</span>
          <div>
            <strong className={activeSize.discountedPrice && style.discount}>
              $ {activeSize.price}
            </strong>
            {activeSize.discountedPrice && (
              <strong> $ {activeSize.discountedPrice}</strong>
            )}
          </div>
        </div>
      </div>
      {specialOrder && (
        <div className={style.cart_item_specialOreder}>
          Special order
          {specialOrder.map((orderS, i) => (
            <span key={i + 55}>{orderS}</span>
          ))}
        </div>
      )}
      <div className={style.cart_item_setting}>
        <CustomButton
          text={"-"}
          type={"service"}
          disabled={count <= 1 ? true : false}
          action={onMinusItem}
        />
        <strong>{count}</strong>

        <CustomButton text={"+"} type={"service"} action={onPlusItem} />

        <CustomButton icon={"delete"} type={"delete"} action={onRemoveItem} />
      </div>
    </div>
  );
}
export default CartItem;
