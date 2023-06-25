export interface CreateNFTBody {
  image: File;
  metadata: string;
  studentAddress: string;
  schoolAuth: string;
}

export interface LoginBodyDto {
  email: string;
  password: string;
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

export interface CreateAccountResponse {
  address: string;
  privateKey: string;
  signTransaction: Function;
  sign: Function;
  encrypt: Function;
}