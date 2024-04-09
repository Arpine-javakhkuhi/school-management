import Joi from "joi";
import { GraphQLError } from "graphql";

import { TeacherDto } from "../../dtos/teacher.dto";
import { HTTPStatus } from "../../types/main.types";

const createTeacherValidator = Joi.object({
  firstName: Joi.string().required().label("E-mail"),
  lastName: Joi.string().required().label("Password"),
  id: Joi.number().required().label("ID"),
});

const editTeacherValidation = async (
  input: TeacherDto & { id: number },
): Promise<void> => {
  const { error } = createTeacherValidator.validate(input);

  if (error?.details[0]?.message) {
    throw new GraphQLError(error?.details[0]?.message, {
      extensions: {
        code: HTTPStatus.BadRequest,
      },
    });
  }
};

export default editTeacherValidation;
