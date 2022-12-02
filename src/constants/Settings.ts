interface ISETTINGS {
  [str: string]: string;
}

export const SETTINGS: ISETTINGS[] = [
  { name: "Settings", icon: "settings", route: "settings" },
  { name: "Favourites", icon: "favourites", route: "favourites" },
  { name: "My Orders", icon: "wallet", route: "my-orders" },
];
