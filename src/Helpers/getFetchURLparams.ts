import { BASE_URL } from "../constants/Urls";

// generate Fetch URL parameters
// pages and limits are not included since there is no proper backend

type URLParamsFN = (
  searchValue: string,
  activeCategory: number,
  sortByProperty: string,
  isASC: boolean
) => string;

export const getFetchURLparams: URLParamsFN = (
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
      param.append("category", `${activeCategory}`);
    }
  }

  const items = new URL("items", BASE_URL);
  items.search = param.toString();

  return items.toString();
};
