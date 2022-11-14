import React from "react";
import IMG from "../IMG";
import CustomButton from "../CustomButton";
import CustomIcon from "../CustomIcon";
import { useDispatch } from "react-redux";
import {
  removeProduct,
  plusProduct,
  minusProduct,
} from "../../Redux/Slices/cartSlice";

import style from "./CartItem.module.scss";

function CartItem({ data }) {
  const { imgURL, title, activeSize, id, lot_id, count, specialOrder } = data;
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
        <IMG id={id} title={title} imgURL={imgURL} type={"small"} />

        <div className={style.cart_item_description_title}>
          <h3>{title}</h3>
          <span>{activeSize.size}</span>
          <div>
            <strong className={activeSize.discountedPrice && style.discount}>
              $ {activeSize.price.toFixed(2)}
            </strong>
            {activeSize.discountedPrice && (
              <strong> $ {activeSize.discountedPrice.toFixed(2)}</strong>
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
