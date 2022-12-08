export type Inputs = Record<string, string | number | boolean>;
export type InputValidations = Record<string, Inputs>;

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
