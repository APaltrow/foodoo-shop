export interface ISort {
  [str: string]: string;
}

export const SORT: ISort[] = [
  { name: "Price", icon: "price" },
  { name: "Title", icon: "alphabet" },
  { name: "Rating", icon: "rating" },
];
