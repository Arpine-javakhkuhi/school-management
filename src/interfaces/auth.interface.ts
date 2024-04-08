import { LoginDto } from "../dtos/login.dto";

import { UserDTO } from "./user.interface";

export interface LoginReturnTypeInterface {
  user: UserDTO;
  accessToken?: string;
}

export interface LoginInputData {
  input: LoginDto;
}
