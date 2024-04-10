import Joi from "joi";
import { GraphQLError } from "graphql";

import { HTTPStatus } from "../../types/main.types";
import { CreateSubjectInput } from "../../interfaces/subject.interface";

const editSubjectValidator = Joi.object({
  name: Joi.string().trim().required().label("Subject name"),
  teacherId: Joi.string().optional().label("Teacher ID"),
  id: Joi.number().required().label("ID"),
});

const editSubjectValidation = async (
  input: CreateSubjectInput & { id: number },
): Promise<void> => {
  const { error } = editSubjectValidator.validate(input);

  if (error?.details[0]?.message) {
    throw new GraphQLError(error?.details[0]?.message, {
      extensions: {
        code: HTTPStatus.BadRequest,
      },
    });
  }
};

export default editSubjectValidation;
