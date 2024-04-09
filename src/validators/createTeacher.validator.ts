import Joi from "joi";
import { GraphQLError } from "graphql";

import { HTTPStatus } from "../types/main.types";
import { TeacherDto } from "../dtos/teacher.dto";

const createTeacherValidator = Joi.object({
  firstName: Joi.string().required().label("E-mail"),
  lastName: Joi.string().required().label("Password"),
});

const createTeacherValidation = async (input: TeacherDto): Promise<void> => {
  const { error } = createTeacherValidator.validate(input);

  if (error?.details[0]?.message) {
    throw new GraphQLError(error?.details[0]?.message, {
      extensions: {
        code: HTTPStatus.BadRequest,
      },
    });
  }
};

export default createTeacherValidation;
