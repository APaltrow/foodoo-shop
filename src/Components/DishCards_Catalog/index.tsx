import React, { FC, useEffect } from "react";

import {
  Paggination,
  NotificationToast,
  NotFound,
  Error,
  DishCardSkeleton,
  DishCardItem,
} from "..";

import { useAppDispatch, useAppSelector } from "../../Hooks/storeHooks";
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

export const DishCardsCatalog: FC = () => {
  const dispatch = useAppDispatch();
  const {
    activeCategory,
    sortBy,
    isASC,
    searchValue,
    activePage,
    totalPages,
    SORT,
  } = useAppSelector(getSortCategoryState);
  const { dishCards, status, error } = useAppSelector(getDishCardsState);
  const sortByProperty = SORT[sortBy].name;

  const getDishCards = () => {
    dispatch(
      fetchDishCards(
        getFetchURLparams(searchValue, activeCategory, sortByProperty, isASC)
      )
    );
  };

  useEffect(() => {
    getDishCards();
  }, [activeCategory, sortBy, isASC, searchValue, sortByProperty]);

  useEffect(() => {
    if (dishCards.length) {
      dispatch(setTotalPages(dishCards.length));
    }
  }, [dishCards]);

  if (status === "error") return <Error error={error} />;
  if (dishCards.length < 1 && status === "success")
    return (
      <NotFound
        message={`Could not find '${searchValue}', try something else !`}
      />
    );

  if (status === "success" || status === "pending")
    return (
      <div className={style.dishCards}>
        <div className={style.dishCards_container}>
          <NotificationToast message={"Added !"} type="cart" />

          {status === "pending"
            ? [1, 2, 3, 4].map((_, i) => (
                <DishCardSkeleton key={i} type="mid" />
              ))
            : dishCards
                .slice(4 * (activePage - 1), activePage * 4) // calculating cards to render-0,4 | 4,8 | 8, 12  no proper backend
                .map((item, i) => (
                  <DishCardItem key={i + item.id} data={item} />
                ))}
        </div>
        {totalPages > 1 && (
          <Paggination totalPages={totalPages} activePage={activePage} />
        )}
      </div>
    );
};
