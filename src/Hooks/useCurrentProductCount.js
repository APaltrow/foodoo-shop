import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getCartState } from "../Redux/Slices/cartSlice";

export const useCurrentProductCount = (id) => {
  const [productCount, setProductCount] = useState(0);
  const { products } = useSelector(getCartState);

  const getProductCount = useCallback(() => {
    const count = products.filter((item) => item.id === id);
    if (count.length > 0) {
      setProductCount(count.reduce((res, val) => res + val.count, 0));
    }
  }, [products]);

  useEffect(() => {
    getProductCount();
  }, [products]);

  return {
    productCount,
  };
};
