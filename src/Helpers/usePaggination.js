import { useState, useEffect } from "react";

export const usePaggination = ({ totalPages, activePage }) => {
  const [active, setActive] = useState(activePage);
  const pgList = [...new Array(totalPages)];

  useEffect(() => setActive(activePage), [activePage]);

  const changeActive = (i) => setActive(i);
  const previous = () =>
    active === 1 ? setActive(active) : setActive(active - 1);
  const next = () =>
    active === totalPages ? setActive(active) : setActive(active + 1);

  return [active, pgList, changeActive, previous, next];
};
