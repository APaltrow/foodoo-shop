import { FC, useEffect } from "react";

import { IPagginationProps, usePaggination } from "../../Hooks/usePaggination";

import { setActivePage, useAppDispatch } from "../../Redux";

import { generateIcon } from "../Icons/Icons";

import style from "./Paggination.module.scss";

export const Paggination: FC<IPagginationProps> = ({
  totalPages,
  activePage,
}) => {
  const dispatch = useAppDispatch();

  const { active, pgList, changeActive, previous, next } = usePaggination({
    totalPages,
    activePage,
  });

  useEffect(() => {
    if (active !== activePage) {
      dispatch(setActivePage(active));
    }
  }, [active]);

  return (
    <aside className={style.root}>
      <button className={style.root_prev} onClick={previous}>
        {generateIcon("next")}
      </button>

      {pgList.map((_, index) => (
        <button
          key={index}
          className={
            activePage === index + 1 ? style.root_item_active : style.root_item
          }
          onClick={() => changeActive(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button className={style.root_next} onClick={next}>
        {generateIcon("next")}
      </button>
    </aside>
  );
};
