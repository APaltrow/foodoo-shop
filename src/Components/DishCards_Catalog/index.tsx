import React, { FC, useEffect } from "react";

import {
  Paggination,
  NotificationToast,
  NotFound,
  Error,
  DishCardSkeleton,
  DishCardItem,
} from "..";

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

//@ts-ignore
export const DishCardsCatalog: FC = () => {
  const dispatch = useDispatch();
  const {
    activeCategory,
    sortBy,
    isASC,
    searchValue,
    activePage,
    totalPages,
    SORT,
  } = useSelector(getSortCategoryState);
  const { dishCards, status, error } = useSelector(getDishCardsState);
  const sortByProperty = SORT[sortBy].name;

  const getDishCards = () => {
    dispatch(
      //@ts-ignore
      fetchDishCards(
        //@ts-ignore
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
                .slice(4 * (activePage - 1), activePage * 4)
                //@ts-ignore                                 // calculating cards to render-0,4 | 4,8 | 8, 12  no proper backend
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
