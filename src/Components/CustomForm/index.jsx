import React from "react";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import Error from "../Error";
import Icon from "../CustomIcon";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { useForm } from "../../Helpers/useForm";

import style from "./CustomForm.module.scss";

const CustomForm = ({ type, title, btn }) => {
  const {
    inputs,
    formValid,
    onInputChange,
    onFormSubmit,
    formError,
    isLoading,
  } = useForm(type);

  return (
    <form className={style.form} onSubmit={onFormSubmit}>
      <Icon type="big" icon="logo" />
      <h1>{title}</h1>

      {isLoading && <Loader />}
      {formError && <Error error={formError} />}

      {inputs.map((input) => (
        <CustomInput {...input} key={input.id} onInputChange={onInputChange} />
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
    </form>
  );
};

export default CustomForm;
