import { getAuthState } from "../Redux/Slices/authSlice";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import CustomForm from "../Components/CustomForm";
import Error from "../Components/Error";
import CustomButton from "../Components/CustomButton";

const Settings = () => {
  const { address, email, firstname, lastname, phone } =
    useSelector(getAuthState).user;
  const [updateAdress, setUpdateAddress] = useState(address ? false : true);

  useEffect(() => {
    setUpdateAddress(false);
  }, [address]);

  return (
    <>
      <div> SETTINGS</div>
      <div>{firstname}</div>
      <div>{lastname}</div>
      <div>Email: {email}</div>
      <div>Phone: {phone}</div>

      {address ? (
        <div>
          Address :
          <div>
            {address.city}, {address.street} {address["house-number"]}
          </div>
        </div>
      ) : (
        <>
          <Error
            error={
              "Looks like you have not submitted any delivery address yet..."
            }
          />
        </>
      )}
      <CustomButton
        text={updateAdress ? "cancel" : "update now"}
        type={updateAdress && "delete"}
        action={() => setUpdateAddress(!updateAdress)}
      />
      {updateAdress && (
        <CustomForm
          type={"delivery_address"}
          title={"Delivery address"}
          btn={"apply"}
        />
      )}
    </>
  );
};

export default Settings;
