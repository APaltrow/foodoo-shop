export type Email = {
  isEmpty: string | boolean;
  minLength: number;
  maxLength: number;
  isEmail: boolean;
};

export type Password = {
  isEmpty: string | boolean;
  minLength: number;
  maxLength: number;
};

export type Text = {
  isEmpty: string | boolean;
  minLength: number;
  maxLength: number;
};

export type Number = {
  isEmpty: string | boolean;
  minLength: number;
  maxLength: number;
};

export type Input = Email | Password | Text | Number;

export type InputValidations = {
  email: Email;
  password: Password;
  text: Text;
  number: Number;
};

export const INPUT_VALIDATIONS: InputValidations = {
  email: {
    isEmpty: "",
    minLength: 3,
    maxLength: 30,
    isEmail: true,
  },
  password: { isEmpty: "", minLength: 6, maxLength: 20 },
  text: { isEmpty: "", minLength: 1, maxLength: 20 },
  number: { isEmpty: "", minLength: 1, maxLength: 20 },
};
