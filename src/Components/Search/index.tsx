import { FC } from "react";

import { CustomIcon } from "..";

import { useSearch } from "../../Hooks/useSearch";

import style from "./Search.module.scss";

export const Search: FC = () => {
  const { value, isVisible, ref, toggle, handleChange, onDismiss } =
    useSearch();

  return (
    <label htmlFor="search" className={style.search} ref={ref}>
      <CustomIcon type={"mid"} icon={"search"} action={toggle} />

      {isVisible || value ? (
        <input
          className={style.input}
          onChange={handleChange}
          value={value}
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
        />
      ) : null}

      {value && (
        <CustomIcon type={"small"} icon={"dismiss"} action={onDismiss} />
      )}
    </label>
  );
};
