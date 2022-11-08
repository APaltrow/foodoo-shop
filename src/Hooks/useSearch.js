import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { useToggle } from "./useToggle";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchValue,
  getSortCategoryState,
} from "../Redux/Slices/sortCategory";

export const useSearch = () => {
  const { searchValue } = useSelector(getSortCategoryState);
  const [value, setValue] = useState("");
  const [debValue] = useDebounce(value, 600);
  const [isVisible, ref, toggle] = useToggle();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchValue !== value) {
      dispatch(setSearchValue(debValue));
    }
  }, [debValue]);

  const handleChange = (event) => setValue(event.target.value);
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
