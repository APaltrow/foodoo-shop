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

export const cardItems = [
  {
    id: "asdasd",
    title: "Pepperoni",
    category: 1,
    sizes: [
      { size: "Large", price: 10 },
      { size: "Medium", price: 9 },
      { size: "Small", price: 6 },
    ],
    price: 10,
    rating: 4,
    isVegitarian: false,
    imgURL: "https://craftlog.com/m/i/11084899=s1280-c",
  },
  {
    id: "0asaad2",
    title: "Chizza Royal",
    category: 1,
    sizes: [
      { size: "Large", price: 15 },
      { size: "Small", price: 10 },
    ],
    price: 15,
    rating: 5,
    isVegitarian: false,
    imgURL: "https://cdn.nur.kz/images/1120x630/7b3bd6af80e595b4.jpeg",
  },
  {
    id: "0asdaq223",
    title: "Yammani",
    category: 1,
    sizes: [
      { size: "Large", price: 12 },
      { size: "Medium", price: 10 },
      { size: "Small", price: 8 },
    ],
    price: 12,
    rating: 4,
    isVegitarian: false,
    imgURL:
      "https://static.toiimg.com/thumb/59123476.cms?width=1200&height=900",
  },
  {
    id: "0aasdqw22214",
    title: "Fujitsu",
    category: 1,
    sizes: [
      { size: "Large", price: 20 },
      { size: "Small", price: 15 },
    ],
    price: 20,
    rating: 3,
    isVegitarian: true,
    imgURL:
      "https://x100-venus-dp-ua.gumlet.io/SKU/SUSHI-MASTER/%D0%9F%D1%96%D1%86%D0%B0/3342DF70-1235-11EC-B510-653C67D2E449-%D0%93%D1%80%D0%B8%D0%B1%D0%BE%D0%B5%D0%B4.jpg?alt=media&token=ac458d55-0602-428d-9855-3642bf915432&w=800&format=webp&mode=fit&q=70",
  },
  {
    id: "0a000qw22214",
    title: "Cheeseburger",
    category: 2,
    sizes: [
      { size: "Large", price: 7 },
      { size: "Small", price: 5 },
    ],
    price: 7,
    rating: 5,
    isVegitarian: false,
    imgURL:
      "https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/5:4/w_3129,h_2503,c_limit/Smashburger-recipe-120219.jpg",
  },
  {
    id: "0pppaaaw0qw22214",
    title: "Makatosan",
    category: 2,
    sizes: [
      { size: "Large", price: 9 },
      { size: "Small", price: 7 },
    ],
    price: 9,
    rating: 5,
    isVegitarian: false,
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shroomami-burger-3-1655147735.jpg",
  },
  {
    id: "0pfffgggaaw0qw22214",
    title: "Purpolle",
    category: 2,
    sizes: [
      { size: "Large", price: 12 },
      { size: "Small", price: 10 },
    ],
    price: 12,
    rating: 5,
    isVegitarian: false,
    imgURL:
      "https://www.foodandwine.com/thmb/bw_R6O1xlL4egHkonGB5kXKl_z0=/2000x1333/filters:fill(auto,1)/Tocino-Burgers-FT-RECIPE0722-def99f6c3ce6462fae5b41a688094f4d.jpg",
  },
  {
    id: "0pfuuuvegi214",
    title: "Vegitarion",
    category: 2,
    sizes: [
      { size: "Large", price: 12 },
      { size: "Small", price: 9 },
    ],
    price: 12,
    rating: 4,
    isVegitarian: true,
    imgURL:
      "https://static01.nyt.com/images/2020/06/28/dining/jo-black-bean-burgers/merlin_167531589_227b9414-ffad-4b44-ae53-67483bd2bae5-articleLarge.jpg",
  },
  {
    id: "0pfuuuvegi214",
    title: "Chiabbatone",
    category: 2,
    sizes: [
      { size: "Large", price: 6 },
      { size: "Small", price: 4 },
    ],
    price: 6,
    rating: 4,
    isVegitarian: true,
    imgURL:
      "https://schoolnightvegan.com/wp-content/uploads/2019/09/classic-vegan-burgers-6-819x1024.jpg",
  },
  {
    id: "0pfdrinkooo4",
    title: "Pinepino",
    category: 3,
    sizes: [
      { size: "Large", price: 2 },
      { size: "Small", price: 1 },
    ],
    price: 2,
    rating: 4,
    isVegitarian: true,
    imgURL:
      "https://images.absolutdrinks.com/drink-images/Raw/Absolut/72e8f521-50cf-45bf-80ec-1abf3baec30a.jpg",
  },
  {
    id: "0pfdrsqq11wesabgo4",
    title: "Oranjado",
    category: 3,
    sizes: [
      { size: "Large", price: 2 },
      { size: "Small", price: 1 },
    ],
    price: 2,
    rating: 4,
    isVegitarian: true,
    imgURL:
      "https://www.acouplecooks.com/wp-content/uploads/2021/02/Painkiller-Cocktail-008.jpg",
  },
  {
    id: "0pfdrsqq11weasdasdqsabgo4",
    title: "Strauberrito",
    category: 3,
    sizes: [
      { size: "Large", price: 4 },
      { size: "Small", price: 2 },
    ],
    price: 2,
    rating: 4,
    isVegitarian: true,
    imgURL:
      "https://www.acouplecooks.com/wp-content/uploads/2021/06/Strawberry-Water-006.jpg",
  },
];
