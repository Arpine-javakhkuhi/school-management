import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone/index.js";
import authMiddleware from "../middlewares/auth.middleware";

const context = async ({
  req,
  res,
}: StandaloneServerContextFunctionArgument) => {
  // retrieve a user with the token
  const user = await authMiddleware(req, res);

  // add the user to the context
  return { user };
};

export default context;
