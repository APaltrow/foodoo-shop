import { useState, useEffect } from "react";

import { useDebounce } from "./useDebounce";
import { useToggle } from "./useToggle";

import {
  useAppDispatch,
  useAppSelector,
  setSearchValue,
  getSortCategoryState,
} from "../Redux";

export const useSearch = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector(getSortCategoryState);

  const [value, setValue] = useState<string>("");
  const [debValue] = useDebounce(value, 600);
  const [isVisible, ref, toggle] = useToggle();

  useEffect(() => {
    if (searchValue !== value) {
      dispatch(setSearchValue(debValue));
    }
  }, [debValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const onDismiss = () => setValue("");

  return {
    value,
    isVisible,
    ref,

    toggle,
    handleChange,
    onDismiss,
  };
};
