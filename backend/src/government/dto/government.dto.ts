export interface CreateAccountResponse {
  address: string;
  privateKey: string;
  signTransaction: Function;
  sign: Function;
  encrypt: Function;
}

export interface GetNameByAddress {
  address: string;
}

export interface Response {
  message: string;
  data?: any;
}

export interface CreatePersonBody {
  name: string;
  email: string;
  course: string;
}

export interface CreateSchoolBody {
  name: string;
  email: string;
  password: string;
}
