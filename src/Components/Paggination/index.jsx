import { useEffect } from "react";
import { generateIcon } from "../Icons/Icons";
import { useDispatch } from "react-redux";
import { setActivePage } from "../../Redux/Slices/sortCategory";
import { usePaggination } from "../../Hooks/usePaggination";

import style from "./Paggination.module.scss";

function Paggination({ totalPages, activePage }) {
  const dispatch = useDispatch();

  const [active, pgList, changeActive, previous, next] = usePaggination({
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
    </aside>
  );
}

export default Paggination;
