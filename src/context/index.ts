import { Request } from "express";

import authMiddleware from "../middlewares/auth.middleware";

const context = async ({ req }: { req: Request }) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }
  console.log("req.body", req.body);

  if (req.body.operationName === "Login") {
    return {};
  }
  // retrieve a user with the token
  const user = await authMiddleware(req);
  console.log("user in auth", user);

  // add the user to the context
  return { userId: user.id };
};

export default context;
