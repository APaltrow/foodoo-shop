import { useState, useEffect, FC } from "react";

import { getAuthState, useAppSelector } from "../../Redux";

import { Error, CustomIcon, CustomForm, CustomButton } from "..";

import style from "./Settings.module.scss";
import { FormTypesList } from "../../constants/FormTypes";

enum ActiveFormNames {
  NONE = "",
  PASSWORD = "password",
  ADDRESS = "address",
  PROFILE = "profile",
}

export const Settins: FC = () => {
  const { address, email, password, firstname, lastname, phone } =
    useAppSelector(getAuthState).user;

  const [emailVisible, setEmailVisible] = useState<boolean>(false);

  const [active, setActive] = useState<ActiveFormNames>(ActiveFormNames.NONE);

  const onModifyProfile = (formName: ActiveFormNames) => {
    formName === active ? setActive(ActiveFormNames.NONE) : setActive(formName);
  };

  useEffect(() => {
    setActive(ActiveFormNames.NONE);
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
          text={active === ActiveFormNames.PROFILE ? "cancel" : "edit profile"}
          type={active === ActiveFormNames.PROFILE ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.PROFILE)}
        />
        <CustomButton
          text={
            active === ActiveFormNames.ADDRESS ? "cancel" : "update address"
          }
          type={active === ActiveFormNames.ADDRESS ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.ADDRESS)}
        />
        <CustomButton
          text={
            active === ActiveFormNames.PASSWORD ? "cancel" : "change password"
          }
          type={active === ActiveFormNames.PASSWORD ? "delete" : ""}
          action={() => onModifyProfile(ActiveFormNames.PASSWORD)}
        />
      </div>

      {active === "address" && (
        <CustomForm
          type={FormTypesList.DELIVERY_ADDRESS}
          title={"Delivery address"}
          btn={"apply"}
        />
      )}
      {active === "profile" && (
        <CustomForm
          type={FormTypesList.EDIT_PROFILE}
          title={"Edit profile"}
          btn={"confirm"}
        />
      )}
      {active === "password" && (
        <CustomForm
          type={FormTypesList.CHANGE_PASSWORD}
          title={"Change password"}
          btn={"confirm"}
        />
      )}
    </div>
  );
};
