import { useState } from "react";

import { useDiscount } from "./useDiscount";
import { useGenerateLotID } from "./useGenerateLotID";

import { addProducts, useAppDispatch } from "../Redux";

import { ISize, ICartItem } from "../@types";

interface IUseProductProps {
  id: string;
  imgURL: string;
  title: string;
  price: number;
  rating: number;
  category: number;
  description: string;
  isVegitarian: boolean;
  discount?: number;

  ingredients: string[];
  sizes: ISize[];
  mySpecialOrder?: string[];
}

export type GetSpecOrderType = (order: string[]) => void;
export type ActiveSizeChangeType = (size: ISize) => void;
type AddProductType = () => void;

export const useProduct = ({
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
  mySpecialOrder,
}: IUseProductProps) => {
  // Hooks here
  const dispatch = useAppDispatch();
  const { calculatedActiveSize } = useDiscount();
  const { lotID } = useGenerateLotID();

  /// States here
  const [activeSize, setActiveSize] = useState(
    calculatedActiveSize(sizes[0], discount)
  );
  const [specialOrder, setSpecialOrder] = useState(
    mySpecialOrder ? mySpecialOrder : []
  );

  // manipulation functions
  const onActiveSizeChange: ActiveSizeChangeType = (size) =>
    setActiveSize(calculatedActiveSize(size, discount));

  const getSpecialOrder: GetSpecOrderType = (order) => setSpecialOrder(order);

  const onAddProduct: AddProductType = () => {
    const product: ICartItem = {
      title,
      id,
      lot_id: lotID(id, activeSize.size, specialOrder),
      imgURL,
      activeSize,
      specialOrder,
      count: 1,
    };
    dispatch(addProducts(product));
  };

  return {
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
  };
};
