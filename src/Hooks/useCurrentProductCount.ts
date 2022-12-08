import { useState, useEffect, useCallback } from "react";

import { getCartState, useAppSelector } from "../Redux";

export const useCurrentProductCount = (id: string) => {
  const [productCount, setProductCount] = useState<number>(0);
  const { products } = useAppSelector(getCartState);

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
