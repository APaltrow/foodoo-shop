import { IActiveSize, ISize } from "../@types";

type CalculationType = (activeS: ISize, discount?: number) => IActiveSize;

export const useDiscount = () => {
  const calculatedActiveSize: CalculationType = (activeS, discount) => {
    const initialPrice: number = +activeS.price.toFixed(2);

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
