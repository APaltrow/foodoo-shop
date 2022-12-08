import { ISize } from "./Product";

export interface ICartItem {
  id: string;
  lot_id: string;
  title: string;
  imgURL: string;
  count: number;

  activeSize: IActiveSize;
  specialOrder: string[];
}

// IActiveSize => size after discount calculations | With Discount

export interface IActiveSize extends ISize {
  discountedPrice: number | null;
  savedOnDiscount: number | null;
}
