import { GraphQLError } from "graphql";

import teacherModel from "../models/teacher.mode";
import errorMessages from "../constants/errorMessages";
import { HTTPStatus } from "../types/main.types";

const checkIfExists = async (id: number) => {
  const teacher = await teacherModel.getById(id);
  console.log("checkIfExists", checkIfExists);
  if (!teacher) {
    throw new GraphQLError(errorMessages.teacherNotFound, {
      extensions: {
        code: HTTPStatus.NotFound,
      },
    });
  }
};

export default checkIfExists;
