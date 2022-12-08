import { IActiveSize } from "./CartItem";

export interface IFavourite {
  id: string;
  uid?: string;
  favId?: string;

  imgURL: string;
  title: string;
  specialOrder: string[];
  size: IActiveSize;
}
