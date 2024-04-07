import { UserDTO } from "../user/user.interface";

export interface LoginReturnTypeInterface {
  user: UserDTO;
  accessToken?: string;
}
