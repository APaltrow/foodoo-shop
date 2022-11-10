import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import CustomForm from "../Components/CustomForm";
import Error from "../Components/Error";
import CustomButton from "../Components/CustomButton";
import CustomIcon from "../Components/CustomIcon";
import NotificationToast from "../Components/NotificationToast";

import style from "./Settings.module.scss";

const Settings = () => {
  const { address, email, password, firstname, lastname, phone } =
    useSelector(getAuthState).user;

  const [emailVisible, setEmailVisible] = useState(false);
  const [active, setActive] = useState("");

  // 'password' , 'address', 'profile'
  const onModifyProfile = (formName) => {
    formName === active ? setActive("") : setActive(formName);
  };

  useEffect(() => {
    setActive("");
  }, [address, firstname, lastname, phone, password]);

  return (
    <div className={style.settings_container}>
      <NotificationToast message={"Updated !"} type="profile" />
      <div className={style.settings_header}>
        <CustomIcon icon="settings" type="small" />
        <h3>Profile settings</h3>
      </div>

      <CustomIcon icon="review-profile" type="settings" />

      <div className={style.settings_content}>
        <div>
          Name: <span>{firstname}</span>
        </div>
        <div>
          Surname: <span>{lastname}</span>
        </div>
        <div>
          Email: <span>{emailVisible ? email : "*****@***.***"}</span>
          <strong onClick={() => setEmailVisible(!emailVisible)}>
            {emailVisible ? "hide" : "show"}
          </strong>
        </div>
        <div>
          Phone: <span>{phone}</span>
        </div>
      </div>
      {address && address.city ? (
        <address>
          Delivery Address:
          <span>
            {address.city}, {address.street}, {address["house-number"]}
          </span>
        </address>
      ) : (
        <>
          <Error
            error={
              "Looks like you have not submitted any delivery address yet..."
            }
          />
        </>
      )}
      <div className={style.settings_btns}>
        <CustomButton
          text={active === "profile" ? "cancel" : "edit profile"}
          type={active === "profile" && "delete"}
          action={() => onModifyProfile("profile")}
        />
        <CustomButton
          text={active === "address" ? "cancel" : "update address"}
          type={active === "address" && "delete"}
          action={() => onModifyProfile("address")}
        />
        <CustomButton
          text={active === "password" ? "cancel" : "change password"}
          type={active === "password" && "delete"}
          action={() => onModifyProfile("password")}
        />
      </div>

      {active === "address" && (
        <CustomForm
          type={"delivery_address"}
          title={"Delivery address"}
          btn={"apply"}
        />
      )}
      {active === "profile" && (
        <CustomForm
          type={"edit_profile"}
          title={"Edit profile"}
          btn={"confirm"}
        />
      )}
      {active === "password" && (
        <CustomForm
          type={"change_password"}
          title={"Change password"}
          btn={"confirm"}
        />
      )}
    </div>
  );
};

export default Settings;
