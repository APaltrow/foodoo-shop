export interface IProduct {
  id: string;
  title: string;
  description: string;
  imgURL: string;
  category: number;
  price: number;
  discount?: number;
  rating: number;
  isVegitarian: boolean;

  ingredients: string[];
  sizes: ISize[];
  reviews: IReview[];
}

export interface ISize {
  size: string;
  price: number;
  weight: number;
  nutrition: number;
}

export interface IReview {
  rating: number;
  comment: string;

  uid?: string;
  ratingId?: number;
  commenter?: string;
  timestamp?: string;
}
