import React from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Error from "../Error";
import Icon from "../CustomIcon";
import Loader from "../Loader";

import { Link } from "react-router-dom";
import { useForm } from "../../Helpers/useForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setAuthStatus, fetchLogedInUser } from "../../Redux/Slices/authSlice";

import style from "./CustomForm.module.scss";

const CustomForm = ({ type, title, btn }) => {
  const {
    inputs,
    formValid,
    onFormSubmit,
    formError,
    formRef,
    checkIfValidForm,
    status,
  } = useForm(type);
  const dispatch = useDispatch();

  const onLoginWithDemo = () => {
    localStorage.setItem("userId", "5");
    dispatch(fetchLogedInUser("5"));
  };

  return (
    <>
      <form
        className={style.form}
        onSubmit={onFormSubmit}
        ref={formRef}
        onKeyUp={checkIfValidForm}
      >
        <Icon type="big" icon="logo" />
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
    </>
  );
};

export default CustomForm;
