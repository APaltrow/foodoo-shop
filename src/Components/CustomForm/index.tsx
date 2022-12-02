import React, { FC } from "react";

import { Loader, Error, CustomInput, CustomIcon, CustomButton } from "..";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { fetchLogedInUser } from "../../Redux/Slices/authSlice";
import { useForm } from "../../Hooks/useForm";

import style from "./CustomForm.module.scss";

interface ICustomFormProps {
  type: string;
  title: string;
  btn: string;
}

export const CustomForm: FC<ICustomFormProps> = ({ type, title, btn }) => {
  const dispatch = useDispatch();

  const {
    checkIfValidForm,
    onFormSubmit,

    inputs,
    formValid,
    formError,
    formRef,
    status,
  } = useForm(type);

  const onLoginWithDemo = () => {
    localStorage.setItem("userId", "5");
    dispatch(fetchLogedInUser("5"));
  };

  return (
    <form
      className={style.form}
      onSubmit={onFormSubmit}
      ref={formRef}
      onKeyUp={checkIfValidForm}
    >
      {type === "login" || type === "registration" ? (
        <CustomIcon type="big" icon="logo" />
      ) : null}
      {type === "login" || type === "registration" ? (
        <h1>{title}</h1>
      ) : (
        <h3>{title}</h3>
      )}

      {status === "pending" && <Loader />}
      {formError && <Error error={formError} />}

      {inputs.map((input) => (
        <CustomInput {...input} key={input.id} />
      ))}

      <CustomButton text={btn} disabled={!formValid} />

      {type === "login" && (
        <div className={style.hint}>
          Do not have an account yet?
          <Link to={"/registration"}> Register</Link>
        </div>
      )}
      {type === "registration" && (
        <div className={style.hint}>
          If you have an account, try to
          <Link to={"/login"}> Login</Link>
        </div>
      )}
      {type === "login" && (
        <CustomButton
          text={"login with demo account"}
          action={onLoginWithDemo}
        />
      )}
    </form>
  );
};
