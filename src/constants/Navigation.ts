export interface INatigation {
  [str: string]: string;
}

export const NAVIGATION: INatigation[] = [
  { name: "All", icon: "all" },
  { name: "Pizzas", icon: "pizza" },
  { name: "Burgers", icon: "burger" },
  { name: "Drinks", icon: "drink" },
  { name: "Vegitarian", icon: "salad" },
];
