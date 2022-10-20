const baseURL = "https://633577edea0de5318a142d98.mockapi.io";
const section = "items";

// generate Fetch URL parameters
// pages and limits are not included since there is no proper backend

export const getFetchURLparams = (
  searchValue,
  activeCategory,
  sortByProperty,
  isASC
) => {
  let param = new URLSearchParams();

  if (searchValue) {
    param.append("title", searchValue.toLowerCase());
  } else {
    isASC ? param.append("order", "asc") : param.append("order", "desc");
    param.append("sortBy", sortByProperty.toLowerCase());
    if (activeCategory === 4) {
      param.append("isVegitarian", "true");
    }
    if (activeCategory > 0 && activeCategory < 4) {
      param.append("category", activeCategory);
    }
  }

  const items = new URL(section, baseURL);
  items.search = param.toString();

  return items.toString();
};
