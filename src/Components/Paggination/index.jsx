import React from "react";
import { generateIcon } from "../Icons/Icons";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../Redux/Slices/sortCategory";
import { usePaggination } from "../../Helpers/usePaggination";

import style from "./Paggination.module.scss";

function Paggination({ totalPages, activePage }) {
  const dispatch = useDispatch();

  const [active, pgList, changeActive, previous, next] = usePaggination({
    totalPages,
    activePage,
  });

  React.useEffect(() => {
    dispatch(setActivePage(active));
  }, [active]);

  return (
    <div className={style.root}>
      <div className={style.root_prev} onClick={previous}>
        {generateIcon("next")}
      </div>

      {pgList.map((_, index) => (
        <div
          key={index}
          className={
            activePage === index + 1 ? style.root_item_active : style.root_item
          }
          onClick={() => changeActive(index + 1)}
        >
          {index + 1}
        </div>
      ))}

      <div className={style.root_next} onClick={next}>
        {generateIcon("next")}
      </div>
    </div>
  );
}

export default Paggination;
