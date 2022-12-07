import React, { useRef, useEffect, FC } from "react";

import { CustomButton } from "..";

import style from "./SpecialOrder.module.scss";

interface SpecialOrderProps {
  ingredients: string[];
  specialOrder: string[];

  getSpecialOrder: (arg: string[]) => void;
  handleModal: (arg: boolean) => void;
}

export const SpecialOrder: FC<SpecialOrderProps> = ({
  ingredients,
  specialOrder,

  getSpecialOrder,
  handleModal,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleForm = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    handleModal(false);
  };
  const exclude = () => {
    const excludedIngredients: string[] = [];
    if (formRef.current) {
      //@ts-ignore
      for (let input of formRef.current.elements) {
        input.checked && excludedIngredients.push(input.name);
      }
    }

    getSpecialOrder(excludedIngredients);
  };
  const reset = () => {
    if (formRef.current) {
      formRef.current.reset();
      getSpecialOrder([]);
    }
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
              defaultChecked={
                specialOrder.filter((excluded) => excluded === ingredient)
                  .length > 0
              }
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
