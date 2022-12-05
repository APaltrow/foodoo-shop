import { useState, useEffect, FC } from "react";
import { useToggle } from "../../Hooks/useToggle";
import { useCalendar } from "../../Hooks/useCalendar";
import { SELECT_TYPES } from "../../constants/SelectTypes";
import { CustomIcon } from "..";

import style from "./CustomSelect.module.scss";

// TYPE : calendar, year, hours dayPart
//Calendar, day, month, year

//@ts-ignore
interface SelectProps {
  type: string;
  getData: (type: string, credentials: any) => void;
}

export const CustomSelect: FC<SelectProps> = ({ type, getData }) => {
  const [isVisible, ref, toggle] = useToggle();
  const {
    date,
    year,
    month,
    day,
    setYear,
    setMonth,
    setDay,
    getDepricated,
    onMonthMinus,
    onMonthPlus,
  } = useCalendar();

  const [value, setValue] = useState(
    type === "calendar" ? day : SELECT_TYPES[type][0]
  );
  const [data, setData] = useState(
    type === "calendar"
      ? SELECT_TYPES[type][month - 1].days
      : SELECT_TYPES[type]
  );

  useEffect(() => {
    if (type === "calendar") {
      setData(SELECT_TYPES[type][month - 1].days);
    }
  }, [month]);

  useEffect(() => {
    if (type === "calendar") {
      getData({
        type,
        credentials: `${value} ${SELECT_TYPES[type][month - 1].name}, ${year}`,
      });
    } else {
      getData({
        type,
        credentials: value,
      });
    }
  }, [value, data]);

  return (
    <section
      className={
        type === "calendar"
          ? style.select_wrapper_big
          : style.select_wrapper_small
      }
    >
      <div className={style.select_option} ref={ref} onClick={toggle}>
        {type === "calendar"
          ? `${value} ${SELECT_TYPES[type][month - 1].name}, ${year}`
          : value}
      </div>
      {isVisible && (
        <ul className={style.select_options}>
          {type === "calendar" && (
            <div className={style.btns} onClick={(e) => e.stopPropagation()}>
              <CustomIcon type="small" icon="next" action={onMonthMinus} />
              {SELECT_TYPES[type][month - 1].name}
              <CustomIcon type="small" icon="next" action={onMonthPlus} />
            </div>
          )}
          {(type === "calendar" ? [...new Array(data)] : data).map((val, i) => (
            <li
              key={i + year}
              data={
                type === "calendar" ? getDepricated(i + 1, year, month) : ""
              }
              className={
                value === val || value === i + 1
                  ? style.select_option_active
                  : style.select_option
              }
              onClick={() => setValue(val ? val : i + 1)}
            >
              {val ? val : i + 1}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
