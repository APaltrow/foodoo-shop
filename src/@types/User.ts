export interface IAddress {
  city: string;
  street: string;
  "house-number": string;
}

export interface IUser {
  id: string | null;
  uid: string | null;
  email: string | null;
  password: string | null;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;

  address: IAddress | null;
}
