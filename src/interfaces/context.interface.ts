import { User } from "@prisma/client";
import { BaseContext } from "@apollo/server";

export type ContextValue = BaseContext & { user: User | null };
