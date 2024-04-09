import { GraphQLError } from "graphql";

import teacherModel from "../models/teacher.model";
import errorMessages from "../constants/errorMessages";
import { HTTPStatus } from "../types/main.types";

const checkIfTeacherExists = async (id: number) => {
  const teacher = await teacherModel.getById(id);

  if (!teacher) {
    throw new GraphQLError(errorMessages.teacherNotFound, {
      extensions: {
        code: HTTPStatus.NotFound,
      },
    });
  }
};

export default checkIfTeacherExists;
