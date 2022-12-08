import { useState } from "react";

export const useCalendar = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());

  const onMonthPlus = () => {
    if (month > 11) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };
  const onMonthMinus = () => {
    if (month < 2) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const getDepricated = (index: number, y: number, m: number) => {
    if (date.getFullYear() > y) {
      return "depricated";
    }
    if (m < date.getMonth() + 1 && date.getFullYear() >= y) {
      return "depricated";
    }
    if (
      index < date.getDate() &&
      m <= date.getMonth() + 1 &&
      date.getFullYear() >= y
    ) {
      return "depricated";
    }
  };

  return {
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
  };
};
