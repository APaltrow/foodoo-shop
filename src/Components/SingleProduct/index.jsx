import React from "react";

import Error from "../Error";
import IMG from "../IMG";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import DishCardSkeleton from "../DIshCard_Skeleton";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";
import Ingredients from "../Ingredients";
import Reviews from "../Reviews";
import RateProduct from "../RateProduct";
import CustomModal from "../CustomModal";
import AddFavourite from "../AddFovourite";
import Discount from "../Discount";
import NotificationToast from "../NotificationToast";
import Slider from "../Slider";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../Redux/Slices/cartSlice";
import { useGenerateLotID } from "../../Helpers/useGenerateLotID";
import {
  getSingleProductState,
  setActiveSize,
  setSpecialOrder,
  fetchSingleProduct,
} from "../../Redux/Slices/singleProductSlice";

import style from "./SingleProduct.module.scss";

const SingleProduct = () => {
  const { id } = useParams();
  const { lotID } = useGenerateLotID();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  const { activeSize, specialOrder, status, error } = useSelector(
    getSingleProductState
  );
  const {
    title,
    rating,
    imgURL,
    category,
    description,
    ingredients,
    isVegitarian,
    sizes,
    discount,
  } = useSelector(getSingleProductState).singleProduct;

  const getSpecialOrder = (order) => dispatch(setSpecialOrder(order));
  const onActiveSizeChange = (sizeActive) =>
    dispatch(setActiveSize(sizeActive));

  const onAddProduct = () => {
    const item = {
      title,
      id,
      lot_id: lotID(id, activeSize.size, specialOrder),
      imgURL,
      activeSize,
      specialOrder,
      count: 1,
    };
    dispatch(addProducts(item));
  };

  if (status === "error") return <Error error={error} />;
  if (status === "pending") return <DishCardSkeleton type="big" />;
  if (status === "success" || status === "pending-rate") {
    return (
      <div className={style.product_container}>
        <NotificationToast message={"Added !"} />
        <div className={style.product_left}>
          <Slider imgURL={imgURL} category={category} />

          <Reviews />

          <div className={style.btns}>
            <CustomButton type={"goBack"} />
            <CustomButton
              icon={"plus"}
              text={"Add to cart"}
              action={onAddProduct}
            />
          </div>
        </div>
        <div className={style.product_right}>
          <h2> {title}</h2>
          <Rating rating={rating} />

          <div className={style.informers}>
            <CustomIcon type={"attention"} icon={"error"} />

            {isVegitarian && <CustomIcon type={"vegitarian"} icon={"salad"} />}
          </div>

          <p>{description}</p>

          <Discount discount={discount} />

          <Sizes
            sizes={sizes}
            activeSize={activeSize}
            discount={discount}
            action={onActiveSizeChange}
          />

          <Ingredients
            ingredients={ingredients}
            activeSize={activeSize}
            getSpecialOrder={getSpecialOrder}
            specialOrder={specialOrder}
          />
          <RateProduct />

          <AddFavourite
            size={activeSize}
            title={title}
            specialOrder={specialOrder}
          />
        </div>
      </div>
    );
  }
};

export default SingleProduct;
