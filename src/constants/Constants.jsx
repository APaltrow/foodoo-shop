export const inputValidations = {
  email: {
    isEmpty: "",
    minLength: 3,
    maxLength: 30,
    isEmail: true,
  },
  password: { isEmpty: "", minLength: 6, maxLength: 20 },
  text: { isEmpty: "", minLength: 1, maxLength: 20 },
  number: { isEmpty: "", minLength: 1, maxLength: 20 },
};

export const Settings = [
  { name: "Settings", icon: "settings", route: "settings" },
  { name: "Favourites", icon: "favourites", route: "favourites" },
  { name: "My Orders", icon: "wallet", route: "my-orders" },
];

export const sort = [
  { name: "Price", icon: "price" },
  { name: "Title", icon: "alphabet" },
  { name: "Rating", icon: "rating" },
];
export const navigation = [
  { name: "All", icon: "all" },
  { name: "Pizzas", icon: "pizza" },
  { name: "Burgers", icon: "burger" },
  { name: "Drinks", icon: "drink" },
  { name: "Vegitarian", icon: "salad" },
];
