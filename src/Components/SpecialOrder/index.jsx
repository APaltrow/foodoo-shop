import React from "react";
import CustomButton from "../CustomButton";

import { useRef } from "react";

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
    handleModal();
  };
  const exclude = () => {
    const excludedIngredients = [];
    for (let input of formRef.current.elements) {
      input.checked && excludedIngredients.push(input.name);
    }
    getSpecialOrder(excludedIngredients);
  };
  const reset = () => {
    getSpecialOrder([]);
  };

  return (
    <div className={style.special_modal}>
      <form className={style.modal_area} ref={formRef} onSubmit={handleForm}>
        <h3>Special order</h3>
        <CustomButton
          text={"reset"}
          icon={"reset"}
          type={"service"}
          action={reset}
        />

        {ingredients.map((ingredient) => (
          <div className={style.ingredient} key={ingredient}>
            <input
              type="checkbox"
              name={ingredient}
              id={ingredient}
              defaultChecked={specialOrder.find(
                (excluded) => excluded === ingredient
              )}
            />

            <label htmlFor={ingredient}>{ingredient}</label>
          </div>
        ))}

        <CustomButton text={"apply"} icon={"checkmark"} action={exclude} />

        <CustomButton
          type={"delete"}
          text={"cancel"}
          icon={"dismiss"}
          action={handleModal}
        />
      </form>
    </div>
  );
};

export default SpecialOrder;
