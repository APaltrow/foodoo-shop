export const INPUT_VALIDATIONS = {
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
