import Joi from "joi";
import { GraphQLError } from "graphql";

import { HTTPStatus } from "../../types/main.types";
import { CreateSubjectInput } from "../../interfaces/subject.interface";

const createSubjectValidator = Joi.object({
  name: Joi.string().trim().required().label("Subject name"),
  teacherId: Joi.string().optional(),
});

const createSubjectValidation = async (
  input: CreateSubjectInput
): Promise<void> => {
  const { error } = createSubjectValidator.validate(input);

  if (error?.details[0]?.message) {
    throw new GraphQLError(error?.details[0]?.message, {
      extensions: {
        code: HTTPStatus.BadRequest,
      },
    });
  }
};

export default createSubjectValidation;
