import React, { FC } from "react";

import { useProduct } from "../../Hooks/useProduct";

import { Sizes, Rating, IMG, Discount, CustomButton, Count } from "..";

import style from "./DishCard_Item.module.scss";
import { IActiveSize } from "../../Hooks/useDiscount";

interface DishCardItemProps {
  data: {
    id: string;
    imgURL: string;
    title: string;
    price: number;
    rating: number;
    category: number;
    description: string;

    discount?: number;
    isVegitarian: boolean;

    ingredients: string[];
    reviews: object[];
    sizes: IActiveSize[];
  };
}

export const DishCardItem: FC<DishCardItemProps> = ({ data }) => {
  const {
    id,
    title,
    rating,
    imgURL,
    sizes,
    discount,

    activeSize,

    onAddProduct,
    onActiveSizeChange,
  } = useProduct({ ...data });

  return (
    <section className={style.dish_card}>
      <IMG id={id} imgURL={imgURL} title={title} type={"mid"} />
      <Discount discount={discount} type={"small"} />
      <div className={style.description}>
        <h3>{title}</h3>
        <Rating rating={rating} />

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
        <Count id={id} />
      </div>
    </section>
  );
};
