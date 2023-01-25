import { IActiveSize, ISize } from "../@types";

type CalculationType = (activeS: ISize, discount?: number) => IActiveSize;

export const useDiscount = () => {
  const calculatedActiveSize: CalculationType = (activeS, discount) => {
    const initialPrice = +activeS.price.toFixed(2);
    const discountAmount = (initialPrice / 100) * (discount || 1);
    const discountedAmount = +(initialPrice - discountAmount).toFixed(2);

    const activeSizeRecalculated: IActiveSize = {
      ...activeS,
      price: initialPrice,
      discountedPrice: null,
      savedOnDiscount: null,
    };
    if (discount) {
      activeSizeRecalculated.discountedPrice = discountedAmount;
      activeSizeRecalculated.savedOnDiscount = discountAmount;
    }

    return activeSizeRecalculated;
  };

  return {
    calculatedActiveSize,
  };
};

{
  /* 
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
*/
}
