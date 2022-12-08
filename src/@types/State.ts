export enum StatusList {
  IDLE = "",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
  PENDING_RATE = "pending-rate",
}

export interface IState {
  status: StatusList;
  error: string;
}
