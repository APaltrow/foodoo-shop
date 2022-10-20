import React from "react";
import CustomButton from "../CustomButton";
import Rating from "../Rating";
import Count from "../Count";
import IMG from "../IMG";
import Sizes from "../Sizes";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getCartState } from "../../Redux/Slices/cartSlice";

import style from "./DishCard_Item.module.scss";

function DishCardItem({ data }) {
  const { imgURL, title, sizes, price, id, rating, discount } = data;
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [productCount, setProductCount] = useState(0);

  const getCartProducts = useSelector(getCartState).products;
  const getProductCount = () => {
    const count = getCartProducts.filter((item) => item.id === id);
    count.length === 0
      ? setProductCount(0)
      : setProductCount(count.reduce((res, val) => res + val.count, 0));
  };

  useEffect(() => {
    getProductCount();
  }, [getCartProducts]);

  const dispatch = useDispatch();

  const onActiveSizeChange = (size) => setActiveSize(sizes[size]);

  const item = { title, id, imgURL, activeSize, count: 1 };
  const onAddProduct = () => dispatch(addProducts(item));

  return (
    <div className={style.dish_card}>
      {discount && (
        <div className={style.discount}>
          <strong>
            {discount}
            <span>%</span>
          </strong>
          <span>Discount!</span>
        </div>
      )}
      <IMG {...data} type={"mid"} />

      <div className={style.description}>
        <h3>{title}</h3>
        {rating && <Rating rating={rating} />}

        <Sizes
          discount={discount}
          sizes={sizes}
          activeSize={activeSize}
          action={onActiveSizeChange}
        />

        {productCount > 0 && <Count data={productCount} />}

        <CustomButton
          action={onAddProduct}
          icon={"plus"}
          text={"Add to cart"}
        />
      </div>
    </div>
  );
}

export default DishCardItem;
