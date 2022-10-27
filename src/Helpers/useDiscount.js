export const useDiscount = () => {
  const calculatedActiveSize = (activeS, discount) => {
    const initialPrice = activeS.price;

    if (discount) {
      return {
        ...activeS,
        price: +initialPrice.toFixed(2),
        discountedPrice: +(
          initialPrice -
          (initialPrice / 100) * discount
        ).toFixed(2),
        savedOnDiscount: (initialPrice / 100) * discount,
      };
    } else {
      return {
        ...activeS,
        price: +initialPrice.toFixed(2),
        discountedPrice: null,
        savedOnDiscount: null,
      };
    }
  };

  return {
    calculatedActiveSize,
  };
};
