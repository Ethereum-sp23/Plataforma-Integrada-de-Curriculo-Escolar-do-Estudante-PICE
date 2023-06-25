export interface CreateNFTBody {
  image: File;
  metadata: string;
  studentAddress: string;
  schoolEmail: string;
}

export interface LoginBodyDto {
  email: string;
  password: string;
}
