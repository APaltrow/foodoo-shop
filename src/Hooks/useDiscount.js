export const useDiscount = () => {
  const calculatedActiveSize = (activeS, discount) => {
    const initialPrice = +activeS.price.toFixed(2);

    if (discount) {
      return {
        ...activeS,
        price: initialPrice,
        discountedPrice: +(
          initialPrice -
          (initialPrice / 100) * discount
        ).toFixed(2),
        savedOnDiscount: (initialPrice / 100) * discount,
      };
    } else {
      return {
        ...activeS,
        price: initialPrice,
        discountedPrice: null,
        savedOnDiscount: null,
      };
    }
  };

  return {
    calculatedActiveSize,
  };
};
