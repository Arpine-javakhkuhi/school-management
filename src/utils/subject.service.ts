import { GraphQLError } from "graphql";

import errorMessages from "../constants/errorMessages";
import { HTTPStatus } from "../types/main.types";
import subjectModel from "../models/subject.model";

const checkIfSubjectExists = async (id: number) => {
  const teacher = await subjectModel.getById(id);

  if (!teacher) {
    throw new GraphQLError(errorMessages.subjectNotFound, {
      extensions: {
        code: HTTPStatus.NotFound,
      },
    });
  }
};

export default checkIfSubjectExists;
