import { useState, useEffect } from "react";

export interface IPagginationProps {
  totalPages: number;
  activePage: number;
}

type ChangeActiveType = (i: number) => void;

export const usePaggination = ({
  totalPages,
  activePage,
}: IPagginationProps) => {
  const [active, setActive] = useState<number>(activePage);
  const pgList: undefined[] = [...new Array(totalPages)];

  useEffect(() => setActive(activePage), [activePage]);

  const changeActive: ChangeActiveType = (i) => setActive(i);

  const previous = () =>
    active === 1 ? setActive(active) : setActive(active - 1);

  const next = () =>
    active === totalPages ? setActive(active) : setActive(active + 1);

  return { active, pgList, changeActive, previous, next };
};
