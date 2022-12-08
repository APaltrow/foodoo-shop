import { FC } from "react";
import { Link } from "react-router-dom";

import { Loader, Error, CustomInput, CustomIcon, CustomButton } from "..";

import { fetchLogedInUser, useAppDispatch } from "../../Redux";

import { useForm } from "../../Hooks/useForm";

import style from "./CustomForm.module.scss";

// refactor-fix ! consider enum for types of forms ||  type: string => ENUM
interface CustomFormProps {
  type: string;
  title: string;
  btn: string;
}

export const CustomForm: FC<CustomFormProps> = ({ type, title, btn }) => {
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
      {type === "login" || type === "registration" ? (
        <CustomIcon type="big" icon="logo" />
      ) : null}
      {type === "login" || type === "registration" ? (
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
          type={input.type}
          placeholder={input.placeholder}
          name={input.name}
        />
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
