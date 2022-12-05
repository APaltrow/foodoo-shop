interface InputValidations {
  email: {
    isEmpty: string;
    minLength: number;
    maxLength: number;
    isEmail: boolean;
  };
  password: {
    isEmpty: string;
    minLength: number;
    maxLength: number;
  };
  text: {
    isEmpty: string;
    minLength: number;
    maxLength: number;
  };
  number: {
    isEmpty: string;
    minLength: number;
    maxLength: number;
  };
}

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
