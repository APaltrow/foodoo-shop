import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import CustomSelect from "../CustomSelect";
import Error from "../Error";

import { useSelector, useDispatch } from "react-redux";

import {
  getCheckoutState,
  setPaymentType,
  setPaymentStatus,
} from "../../Redux/Slices/checkoutSlice";
import { useRef, useState, useEffect } from "react";

import style from "./PaymenType.module.scss";

const PaymentType = ({ fname, lname }) => {
  const dispatch = useDispatch();
  const paymentFormRef = useRef();
  const [validCredentials, setValidCredentials] = useState(false);
  const [credentialsError, setCredentialsError] = useState(false);

  const { paymentType, paymentStatus } = useSelector(getCheckoutState).order;

  const onFormChange = (e) => {
    e.preventDefault();
    const validCredentials = [];
    for (let input of paymentFormRef.current.elements) {
      if (input.getAttribute("name") === "card-number") {
        input.value.length === 16
          ? validCredentials.push("valid card number")
          : setCredentialsError(`Card number should be 16 digits`);
      }
      if (input.getAttribute("name") === "card-cvv") {
        input.value.length === 3
          ? validCredentials.push("valid cvv")
          : setCredentialsError(`Cvv should be 3 digits`);
      }
    }
    if (validCredentials.length === 2) {
      setValidCredentials(true);
      setCredentialsError(false);
    } else {
      setValidCredentials(false);
    }
  };
  const onProcessPayment = (e) => {
    e.preventDefault();
    dispatch(setPaymentStatus("Processing"));
  };
  const onPaymentChange = (pType) => {
    dispatch(setPaymentType(pType));
  };

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (paymentStatus === "Processing") {
      const count = () => {
        if (timer < 10) {
          setTimer(timer + 1);
        }
      };
      setTimeout(() => {
        count();
      }, 1000);
    }
  }, [timer, paymentStatus]);
  useEffect(() => {
    if (timer === 10) {
      dispatch(setPaymentStatus("Payed successfully"));
      setTimer(0);
    }
  }, [timer]);

  return (
    <section className={style.payment_section}>
      <h4>Payment :</h4>
      <div className={style.payment_btns}>
        <CustomButton
          type={paymentType == "cash" ? "active" : ""}
          icon={"cash"}
          text="cash"
          action={() => onPaymentChange("cash")}
          disabled={paymentStatus ? true : false}
        />
        <CustomButton
          type={paymentType == "card" ? "active" : ""}
          icon={"card"}
          text="card"
          action={() => onPaymentChange("card")}
          disabled={paymentStatus ? true : false}
        />
      </div>
      {paymentType === "card" && !paymentStatus && (
        <form
          className={style.credit_card}
          ref={paymentFormRef}
          onChange={onFormChange}
          onSubmit={onProcessPayment}
        >
          <h4>Please process the payment</h4>
          {credentialsError && <Error error={credentialsError} />}
          <span>{`${fname} ${lname}`}</span>
          <div className={style.card_valid}>
            <b>Valid :</b>
            <CustomSelect type="hours" getData={() => {}} />
            <CustomSelect type="year" getData={() => {}} />
          </div>
          <CustomInput
            type={"number"}
            placeholder={"0000 - 0000 - 0000 - 0000"}
            name={"card-number"}
          />
          <CustomInput type={"number"} placeholder={"cvv"} name={"card-cvv"} />

          <CustomButton
            text="pay now"
            disabled={validCredentials ? false : true}
          />
        </form>
      )}
      {paymentStatus && (
        <span className={style.processing}>{paymentStatus}</span>
      )}
      {timer > 0 ? (
        <div className={style.slider}>
          <div
            style={{ width: `${timer * 10}%` }}
            className={style.slider_bar}
          ></div>
        </div>
      ) : null}
    </section>
  );
};

export default PaymentType;
