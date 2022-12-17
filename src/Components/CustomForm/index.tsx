import { FC } from "react";
import { Link } from "react-router-dom";

import { Loader, Error, CustomInput, CustomIcon, CustomButton } from "..";

import { fetchLogedInUser, useAppDispatch } from "../../Redux";
import { InputValidations } from "../../constants/InputValidations";
import { FormTypesList } from "../../constants/FormTypes";

import { useForm } from "../../Hooks/useForm";

import style from "./CustomForm.module.scss";

interface ICustomFormProps {
  type: FormTypesList;
  title: string;
  btn: string;
}

export const CustomForm: FC<ICustomFormProps> = ({ type, title, btn }) => {
  const dispatch = useAppDispatch();

  const {
    inputs,
    formValid,
    formError,
    formRef,
    status,

    checkIfValidForm,
    onFormSubmit,
  } = useForm(type);

  const onLoginWithDemo = () => {
    localStorage.setItem("userId", "5");
    dispatch(fetchLogedInUser("5"));
  };

  return (
    <form
      className={style.form}
      ref={formRef}
      onSubmit={onFormSubmit}
      onKeyUp={checkIfValidForm}
    >
      {type === FormTypesList.LOGIN || type === FormTypesList.REGISTRATION ? (
        <CustomIcon type="big" icon="logo" />
      ) : null}
      {type === FormTypesList.LOGIN || type === FormTypesList.REGISTRATION ? (
        <h1>{title}</h1>
      ) : (
        <h3>{title}</h3>
      )}

      {status === "pending" && <Loader />}
      {formError && <Error error={`${formError}`} />}

      {inputs.map((input) => (
        <CustomInput
          key={input.id}
          id={input.id}
          type={input.type as keyof InputValidations}
          placeholder={input.placeholder}
          name={input.name}
        />
      ))}

      <CustomButton text={btn} disabled={!formValid} />

      {type === FormTypesList.LOGIN && (
        <div className={style.hint}>
          Do not have an account yet?
          <Link to={"/registration"}> Register</Link>
        </div>
      )}
      {type === FormTypesList.REGISTRATION && (
        <div className={style.hint}>
          If you have an account, try to
          <Link to={"/login"}> Login</Link>
        </div>
      )}
      {type === FormTypesList.LOGIN && (
        <CustomButton
          text={"login with demo account"}
          action={onLoginWithDemo}
        />
      )}
    </form>
  );
};
