import Joi from "joi";
import { GraphQLError } from "graphql";

import { HTTPStatus } from "../types/main.types";
import { LoginDto } from "../dtos/login.dto";

const authValidator = Joi.object({
  email: Joi.string().required().email().label("E-mail"),
  password: Joi.string().required().label("Password"),
});

const loginValidation = async (input: LoginDto): Promise<void> => {
  const { error } = authValidator.validate(input);

  if (error?.details[0]?.message) {
    throw new GraphQLError(error?.details[0]?.message, {
      extensions: {
        code: HTTPStatus.BadRequest,
      },
    });
  }
};

export default loginValidation;
