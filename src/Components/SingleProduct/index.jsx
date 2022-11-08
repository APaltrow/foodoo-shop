import React from "react";
import Rating from "../Rating";
import CustomButton from "../CustomButton";
import Sizes from "../Sizes";
import CustomIcon from "../CustomIcon";
import Ingredients from "../Ingredients";
import Reviews from "../Reviews";
import RateProduct from "../RateProduct";
import AddFavourite from "../AddFovourite";
import Discount from "../Discount";
import NotificationToast from "../NotificationToast";
import Slider from "../Slider";
import Count from "../Count";

import { useProduct } from "../../Hooks/useProduct";

import style from "./SingleProduct.module.scss";

const SingleProduct = ({ singleProduct }) => {
  const {
    onAddProduct,
    getSpecialOrder,
    onActiveSizeChange,

    activeSize,
    specialOrder,

    id,
    title,
    rating,
    imgURL,
    category,
    description,
    ingredients,
    isVegitarian,
    sizes,
    discount,
  } = useProduct({ ...singleProduct });

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
          <Count id={id} />
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
};

export default SingleProduct;
