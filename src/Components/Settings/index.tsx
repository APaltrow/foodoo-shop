import { useState, useEffect, FC } from "react";

import { getAuthState } from "../../Redux/Slices/authSlice";
import { useAppSelector } from "../../Hooks/storeHooks";

import { Error, CustomIcon, CustomForm, CustomButton } from "..";

import style from "./Settings.module.scss";

enum ActiveFormNames {
  none = "",
  password = "password",
  address = "address",
  profile = "profile",
}

export const Settins: FC = () => {
  const { address, email, password, firstname, lastname, phone } =
    useAppSelector(getAuthState).user;

  const [emailVisible, setEmailVisible] = useState<boolean>(false);
  const [active, setActive] = useState<ActiveFormNames>(ActiveFormNames.none);

  const onModifyProfile = (formName: ActiveFormNames) => {
    formName === active ? setActive(ActiveFormNames.none) : setActive(formName);
  };

  useEffect(() => {
    setActive(ActiveFormNames.none);
  }, [address, firstname, lastname, phone, password]);

  return (
    <div className={style.settings_container}>
      <CustomIcon icon="review-profile" type="settings" />

      <div className={style.settings_content}>
        <div className={style.settings_content_item}>
          Name: <span>{firstname}</span>
        </div>
        <div className={style.settings_content_item}>
          Surname: <span>{lastname}</span>
        </div>
        <div className={style.settings_content_item}>
          Email: <span>{emailVisible ? email : "*****@***.***"}</span>
          <b onClick={() => setEmailVisible(!emailVisible)}>
            {emailVisible ? "hide" : "show"}
          </b>
        </div>
        <div className={style.settings_content_item}>
          Phone: <span>{phone}</span>
        </div>
      </div>
      {address ? (
        <address>
          Delivery Address:
          <span>
            {address.city}, {address.street}, {address["house-number"]}
          </span>
        </address>
      ) : (
        <Error
          error={
            "Looks like you have not submitted any delivery address yet..."
          }
        />
      )}
      <div className={style.settings_buttons}>
        <CustomButton
          text={active === "profile" ? "cancel" : "edit profile"}
          type={active === "profile" ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.profile)}
        />
        <CustomButton
          text={active === "address" ? "cancel" : "update address"}
          type={active === "address" ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.address)}
        />
        <CustomButton
          text={active === "password" ? "cancel" : "change password"}
          type={active === "password" ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.password)}
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
