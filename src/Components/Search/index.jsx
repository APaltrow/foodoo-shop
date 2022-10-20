import React from "react";
import Icon from "../CustomIcon";

import { useSearch } from "../../Helpers/useSearch";

import style from "./Search.module.scss";

function Search() {
  const { value, isVisible, ref, toggle, handleChange, onDismiss } =
    useSearch();

  return (
    <label htmlFor="search" className={style.search} ref={ref}>
      <Icon type={"mid"} icon={"search"} action={toggle} />

      {isVisible && (
        <input
          className={style.input}
          onChange={handleChange}
          value={value}
          id="search"
          type="text"
          placeholder="Search..."
          autoComplete="off"
        />
      )}

      {value && (
        <span>
          <Icon type={"small"} icon={"dismiss"} action={onDismiss} />
        </span>
      )}
    </label>
  );
}

export default Search;
