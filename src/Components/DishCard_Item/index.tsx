import { FC } from "react";

import { useProduct } from "../../Hooks/useProduct";
import { IProduct } from "../../@types";

import { Sizes, Rating, IMG, Discount, CustomButton, Count } from "..";

import style from "./DishCard_Item.module.scss";

interface DishCardItemProps {
  data: IProduct;
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
