import React from "react";
import CustomForm from "../Components/CustomForm";

function Registration() {
  return (
    <>
      <CustomForm
        type={"registration"}
        title={"Registration"}
        btn={"Register"}
      />
      <CustomForm
        type={"delivery_address"}
        title={"Delivery address"}
        btn={"apply"}
      />
    </>
  );
}

export default Registration;
