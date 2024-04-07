import { User } from "@prisma/client";

export type UserDTO = Pick<User, "id" | "email" | "firstName" | "lastName">;

export interface UserInterface {
  getById: (id: number) => Promise<User | null>;

  getByEmail: (email: string) => Promise<UserDTO | null>;

  getByCredentials: (email: string, password: string) => Promise<User>;

  toDTO: (user: User) => UserDTO;
}
