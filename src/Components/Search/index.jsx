import React from "react";

import Icon from "../CustomIcon";

import { useSearch } from "../../Hooks/useSearch";

import style from "./Search.module.scss";

const Search = () => {
  const { value, isVisible, ref, toggle, handleChange, onDismiss } =
    useSearch();

  return (
    <label htmlFor="search" className={style.search} ref={ref}>
      <Icon type={"mid"} icon={"search"} action={toggle} />

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

      {value && <Icon type={"small"} icon={"dismiss"} action={onDismiss} />}
    </label>
  );
};

export default Search;
