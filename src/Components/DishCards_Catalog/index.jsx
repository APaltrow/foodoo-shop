import React from "react";
import axios from "axios";

import DishCardItem from "../DishCard_Item";
import DishCardSkeleton from "../DIshCard_Skeleton";
import Paggination from "../Paggination";
import NotFound from "../NotFound";
import { navigation } from "../../constants/Constants";

import { useDispatch, useSelector } from "react-redux";
import {
  getSortCategoryState,
  setTotalPages,
} from "../../Redux/Slices/sortCategory";
import {
  getDishCardsState,
  setDishCards,
  setIsLoading,
} from "../../Redux/Slices/dishCards";
import { getFetchURLparams } from "../../Helpers/getFetchURLparams";

import style from "./DishCardsCatalog.module.scss";

function DishCardsCatalog() {
  const {
    activeCategory,
    sortBy,
    isASC,
    searchValue,
    activePage,
    totalPages,
    sort,
  } = useSelector(getSortCategoryState);
  const { dishCards, isLoading } = useSelector(getDishCardsState);
  const dispatch = useDispatch();

  const sortByProperty = sort[sortBy].name;

  const fetchDishCards = async () => {
    dispatch(setIsLoading(true));
    dispatch(setDishCards([]));

    const { data } = await axios.get(
      getFetchURLparams(searchValue, activeCategory, sortByProperty, isASC)
    );
    dispatch(setTotalPages(data.length));
    dispatch(setDishCards(data));
    dispatch(setIsLoading(false));
  };

  React.useEffect(() => {
    fetchDishCards();
  }, [activeCategory, sortBy, isASC, searchValue, sortByProperty]);

  return (
    <div className={style.dishCards}>
      <h2>{navigation[activeCategory].name}</h2>
      {dishCards.length < 1 && isLoading === false ? <NotFound /> : null}
      <div className={style.dishCards_container}>
        {isLoading
          ? [1, 2, 3, 4].map((_, i) => <DishCardSkeleton key={i} />)
          : dishCards
              .slice(4 * (activePage - 1), activePage * 4) //0,4 | 4,8 | 8, 12  no proper backend
              .map((item, i) => <DishCardItem key={i + item.id} data={item} />)}
      </div>
      {totalPages > 1 && (
        <Paggination totalPages={totalPages} activePage={activePage} />
      )}
    </div>
  );
}

export default DishCardsCatalog;
