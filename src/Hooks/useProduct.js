import { useState } from "react";
import { useDispatch } from "react-redux";
import { useDiscount } from "./useDiscount";
import { useGenerateLotID } from "./useGenerateLotID";
import { addProducts } from "../Redux/Slices/cartSlice";

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
}) => {
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
  const onActiveSizeChange = (size) =>
    setActiveSize(calculatedActiveSize(size, discount));
  const getSpecialOrder = (order) => setSpecialOrder(order);

  const onAddProduct = () => {
    const product = {
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
