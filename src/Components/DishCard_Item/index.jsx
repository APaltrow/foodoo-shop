import React from "react";
import CustomButton from "../CustomButton";
import Rating from "../Rating";
import Count from "../Count";
import IMG from "../IMG";
import Sizes from "../Sizes";
import Discount from "../Discount";
import NotificationToast from "../NotificationToast";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getCartState } from "../../Redux/Slices/cartSlice";
import { useGenerateLotID } from "../../Helpers/useGenerateLotID";
import { useDiscount } from "../../Helpers/useDiscount";

import style from "./DishCard_Item.module.scss";
import { useCallback } from "react";

function DishCardItem({ data }) {
  const { imgURL, title, sizes, id, rating, discount } = data;
  const { calculatedActiveSize } = useDiscount();
  const { lotID } = useGenerateLotID();
  const dispatch = useDispatch();
  const [activeSize, setActiveSize] = useState(
    calculatedActiveSize(sizes[0], discount)
  );
  const [toast, setToast] = useState(false);

  const [productCount, setProductCount] = useState(0);
  const getCartProducts = useSelector(getCartState).products;
  const getProductCount = useCallback(() => {
    const count = getCartProducts.filter((item) => item.id === id);
    count.length === 0
      ? setProductCount(0)
      : setProductCount(count.reduce((res, val) => res + val.count, 0));
  }, [getCartProducts]);

  useEffect(() => {
    getProductCount();
  }, [getCartProducts]);

  const onActiveSizeChange = (size) =>
    setActiveSize(calculatedActiveSize(size, discount));

  const onAddProduct = () => {
    const item = {
      title,
      id,
      lot_id: lotID(id, activeSize.size, []),
      imgURL,
      activeSize,
      specialOrder: [],
      count: 1,
    };
    dispatch(addProducts(item));
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 50);
  };

  return (
    <>
      <NotificationToast message={"Added !"} listen={toast} />

      <div className={style.dish_card}>
        <IMG {...data} type={"mid"} />
        <Discount discount={discount} type={"small"} />
        <div className={style.description}>
          <h3>{title}</h3>
          {rating && <Rating rating={rating} />}

          <Sizes
            discount={discount}
            sizes={sizes}
            activeSize={activeSize}
            action={onActiveSizeChange}
          />

          <CustomButton
            action={onAddProduct}
            icon={"plus"}
            text={"Add to cart"}
          />
          {productCount > 0 && <Count data={productCount} />}
        </div>
      </div>
    </>
  );
}

export default DishCardItem;
