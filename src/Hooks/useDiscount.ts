export interface IActiveSize {
  size: string;
  price: number;
  weight: number;
  nutrition: number;
}

export interface IActiveSizeWithDiscount extends IActiveSize {
  discountedPrice: number | null;
  savedOnDiscount: number | null;
}

type CalculationType = (
  activeS: IActiveSize,
  discount?: number
) => IActiveSizeWithDiscount;

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
