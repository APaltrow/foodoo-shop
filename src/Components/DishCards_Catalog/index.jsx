import React from "react";

import DishCardItem from "../DishCard_Item";
import DishCardSkeleton from "../DIshCard_Skeleton";
import Paggination from "../Paggination";
import NotFound from "../NotFound";
import Error from "../Error";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSortCategoryState,
  setTotalPages,
} from "../../Redux/Slices/sortCategory";
import {
  getDishCardsState,
  fetchDishCards,
} from "../../Redux/Slices/dishCards";
import { getFetchURLparams } from "../../Helpers/getFetchURLparams";

import style from "./DishCardsCatalog.module.scss";

function DishCardsCatalog() {
  const dispatch = useDispatch();
  const {
    activeCategory,
    sortBy,
    isASC,
    searchValue,
    activePage,
    totalPages,
    sort,
  } = useSelector(getSortCategoryState);
  const { dishCards, status, error } = useSelector(getDishCardsState);
  const sortByProperty = sort[sortBy].name;

  const getDishCards = () => {
    dispatch(
      fetchDishCards(
        getFetchURLparams(searchValue, activeCategory, sortByProperty, isASC)
      )
    );
  };

  useEffect(() => {
    getDishCards();
    dispatch(setTotalPages(dishCards.length));
  }, [activeCategory, sortBy, isASC, searchValue, sortByProperty]);

  if (status === "error") return <Error error={error} />;
  if (dishCards.length < 1 && status === "success") return <NotFound />;
  if (status === "success" || status === "pending")
    return (
      <div className={style.dishCards}>
        <div className={style.dishCards_container}>
          {status === "pending"
            ? [1, 2, 3, 4].map((_, i) => (
                <DishCardSkeleton key={i} type="mid" />
              ))
            : dishCards
                .slice(4 * (activePage - 1), activePage * 4) //0,4 | 4,8 | 8, 12  no proper backend
                .map((item, i) => (
                  <DishCardItem key={i + item.id} data={item} />
                ))}
        </div>
        {totalPages > 1 && (
          <Paggination totalPages={totalPages} activePage={activePage} />
        )}
      </div>
    );
}

export default DishCardsCatalog;
