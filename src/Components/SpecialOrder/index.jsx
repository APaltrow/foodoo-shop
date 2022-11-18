import React from "react";

import { useRef, useEffect } from "react";

import CustomButton from "../CustomButton";

import style from "./SpecialOrder.module.scss";

const SpecialOrder = ({
  ingredients,
  getSpecialOrder,
  handleModal,
  specialOrder,
}) => {
  const formRef = useRef();

  const handleForm = (e) => {
    e.preventDefault();
    handleModal(false);
  };
  const exclude = () => {
    const excludedIngredients = [];
    for (let input of formRef.current.elements) {
      input.checked && excludedIngredients.push(input.name);
    }
    getSpecialOrder(excludedIngredients);
  };
  const reset = () => {
    formRef.current.reset();
    getSpecialOrder([]);
  };

  useEffect(() => {
    return () => {
      getSpecialOrder([]);
    };
  }, []);
  return (
    <form className={style.special_order} ref={formRef} onSubmit={handleForm}>
      <h3>Special order</h3>
      <div className={style.ingredients}>
        {ingredients.map((ingredient) => (
          <div className={style.ingredient} key={ingredient}>
            <input type="checkbox" name={ingredient} id={ingredient} />

            <label
              htmlFor={ingredient}
              defaultChecked={specialOrder.filter(
                (excluded) => excluded === ingredient
              )}
            >
              {ingredient}
            </label>
          </div>
        ))}
      </div>
      <CustomButton text={"apply"} icon={"checkmark"} action={exclude} />
      <CustomButton text={"reset"} icon={"reset"} action={reset} />
    </form>
  );
};

export default SpecialOrder;
