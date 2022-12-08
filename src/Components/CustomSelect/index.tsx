import { useState, useEffect, FC } from "react";

import { useToggle } from "../../Hooks/useToggle";
import { useCalendar } from "../../Hooks/useCalendar";

import { SELECT_TYPES } from "../../constants/SelectTypes";

import { CustomIcon } from "..";

import style from "./CustomSelect.module.scss";

// TYPE : calendar, year, hours dayPart
//Calendar, day, month, year

export enum SelectTypes {
  CALENDAR = "calendar",
  YEAR = "year",
  HOURS = "hours",
  DAYPART = "dayPart",
}
//  refactor-fix Consider setting calendar as a separate comp

//@ts-ignore
interface SelectProps {
  type: SelectTypes;

  getData: (type: string, credentials: string | number) => void;
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
    type === SelectTypes.CALENDAR ? day : SELECT_TYPES[type][0]
  );
  const [data, setData] = useState(
    type === SelectTypes.CALENDAR
      ? SELECT_TYPES[type][month - 1].days
      : SELECT_TYPES[type]
  );

  useEffect(() => {
    if (type === SelectTypes.CALENDAR) {
      setData(SELECT_TYPES[type][month - 1].days);
    }
  }, [month]);

  useEffect(() => {
    if (type === SelectTypes.CALENDAR) {
      getData(type, `${value} ${SELECT_TYPES[type][month - 1].name}, ${year}`);
    } else {
      getData(type, value);
    }
  }, [value, data]);

  return (
    <section
      className={
        type === SelectTypes.CALENDAR
          ? style.select_wrapper_big
          : style.select_wrapper_small
      }
    >
      <div className={style.select_option} ref={ref} onClick={toggle}>
        {type === SelectTypes.CALENDAR
          ? `${value} ${SELECT_TYPES[type][month - 1].name}, ${year}`
          : value}
      </div>
      {isVisible && (
        <ul className={style.select_options}>
          {type === SelectTypes.CALENDAR && (
            <div className={style.btns} onClick={(e) => e.stopPropagation()}>
              <CustomIcon type="small" icon="next" action={onMonthMinus} />
              {SELECT_TYPES[type][month - 1].name}
              <CustomIcon type="small" icon="next" action={onMonthPlus} />
            </div>
          )}

          {
            //@ts-ignore
            (type === SelectTypes.CALENDAR ? [...new Array(data)] : data).map(
              //@ts-ignore
              (val, i) => (
                <li
                  key={i + year}
                  //@ts-ignore
                  data={
                    type === SelectTypes.CALENDAR
                      ? getDepricated(i + 1, year, month)
                      : ""
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
              )
            )
          }
        </ul>
      )}
    </section>
  );
};
