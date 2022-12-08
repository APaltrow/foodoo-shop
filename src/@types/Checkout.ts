export interface IOrder {
  uid: string | null;
  orderId: string | null;
  recipient: string | null;
  deliveryAddress: string | null;
  paymentType: string;
  totalCost: number | null;
  orderDate: string | null;
  paymentStatus: string | null;
  orderStatus: string;

  ordercheck: IOrderCheck[] | null;
  preorder: IPreorder | null;
}

export interface IOrderCheck {
  title: string;
  count: number;
  size: string;
  price: number;
  specialOrder: string;
}

export interface IPreorder {
  hours: number | null;
  dayPart: string | null;
  calendar: string | null;
}
