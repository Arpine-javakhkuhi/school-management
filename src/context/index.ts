import { Request } from "express";

import authMiddleware from "../middlewares/auth.middleware";

const context = async ({ req }: { req: Request }) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }

  if (req.body.operationName === "Login") {
    return {};
  }
  // retrieve a user with the token
  const user = await authMiddleware(req);

  // add the user to the context
  return { user };
};

export default context;
