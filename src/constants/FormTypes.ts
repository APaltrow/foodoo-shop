export enum FormTypesList {
  LOGIN = "login",
  REGISTRATION = "registration",
  DELIVERY_ADDRESS = "delivery_address",
  EDIT_PROFILE = "edit_profile",
  CHANGE_PASSWORD = "change_password",
}

type InputType = {
  [type: string]: string;
};

interface FormTypes {
  [type: string]: InputType[];
}

export const FORM_TYPES: FormTypes = {
  login: [
    {
      id: "email01_login",
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      id: "pass01_login",
      type: "password",
      name: "password",
      placeholder: "Password",
    },
  ],
  registration: [
    {
      id: "email01_regist",
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      id: "pass01_regist",
      type: "password",
      name: "password",
      placeholder: "Password",
    },
    {
      id: "fname_regist",
      type: "text",
      name: "firstname",
      placeholder: "First Name",
    },
    {
      id: "lname_regist",
      type: "text",
      name: "lastname",
      placeholder: "Last Name",
    },
    {
      id: "phnumber_regist",
      type: "text",
      name: "phone",
      placeholder: "Phone Number",
    },
  ],
  delivery_address: [
    {
      id: "cityname_address",
      type: "text",
      name: "city",
      placeholder: "City",
    },
    {
      id: "streetname_address",
      type: "text",
      name: "street",
      placeholder: "Street",
    },
    {
      id: "num_address",
      type: "text",
      name: "house-number",
      placeholder: "House or appartment number",
    },
  ],
  edit_profile: [
    {
      id: "fname_regist",
      type: "text",
      name: "firstname",
      placeholder: "First Name",
    },
    {
      id: "lname_regist",
      type: "text",
      name: "lastname",
      placeholder: "Last Name",
    },
    {
      id: "phnumber_regist",
      type: "text",
      name: "phone",
      placeholder: "Phone Number",
    },
  ],
  change_password: [
    {
      id: "pass_old_change",
      type: "password",
      name: "old_password",
      placeholder: "Old password",
    },
    {
      id: "pass_new_change",
      type: "password",
      name: "new_password",
      placeholder: "New password",
    },
    {
      id: "pass_new_repeat_change",
      type: "password",
      name: "new_repeat_password",
      placeholder: "Repeat new password",
    },
  ],
};
