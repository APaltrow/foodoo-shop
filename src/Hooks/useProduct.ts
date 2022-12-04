import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDiscount } from "./useDiscount";
import { useGenerateLotID } from "./useGenerateLotID";
import { addProducts } from "../Redux/Slices/cartSlice";

import { IActiveSize, IActiveSizeWithDiscount } from "./useDiscount";

interface useProductProps {
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
  sizes: IActiveSize[];
  mySpecialOrder?: string[];
}

export type CartItem = {
  id: string;
  lot_id: string;
  title: string;
  imgURL: string;
  count: number;

  activeSize: IActiveSizeWithDiscount;
  specialOrder: string[] | [];
};

type GetSpecOrderType = (order: string[]) => void;
type ActiveSizeChangeType = (size: IActiveSize) => void;
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
}: useProductProps) => {
  // Hooks here
  const dispatch = useDispatch();
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
    const product: CartItem = {
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
