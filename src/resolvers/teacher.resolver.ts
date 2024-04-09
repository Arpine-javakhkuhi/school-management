import SUCCESS_MESSAGES from "../constants/successMessages";
import { CreateTeacherInputData } from "../interfaces/teacher.interface";
import teacherModel from "../models/teacher.model";
import createTeacherValidation from "../validators/teacher/createTeacher.validator";
import checkIfTeacherExists from "../utils/teacher.service";
import editTeacherValidation from "../validators/teacher/editTeacher.validator";
import ERROR_MESSAGES from "../constants/errorMessages";

const teacherResolver = {
  Query: {
    getTeachers: async () => {
      const allTeachers = await teacherModel.findAll();

      return allTeachers;
    },
  },

  Mutation: {
    createTeacher: async (
      _: unknown,
      { createTeacherInput }: CreateTeacherInputData,
    ) => {
      await createTeacherValidation(createTeacherInput);

      const teacher = await teacherModel.create(createTeacherInput);
      return teacher;
    },

    deleteTeacher: async (_, { id }) => {
      const { count } = await teacherModel.delete(+id);

      const responseMessage = count
        ? ERROR_MESSAGES.failedToDeleteTeacher
        : SUCCESS_MESSAGES.teacherSuccessfullyDeleted;

      return {
        isSuccess: !!count,
        message: responseMessage,
      };
    },

    editTeacher: async (
      _,
      { id, editTeacherInput: { firstName, lastName } },
    ) => {
      await editTeacherValidation({ ...{ firstName, lastName }, id });
      await checkIfTeacherExists(+id);

      const newTeacher = await teacherModel.update(+id, {
        firstName,
        lastName,
      });

      return {
        isSuccess: !!newTeacher,
        message: SUCCESS_MESSAGES.teacherSuccessfullyUpdated,
      };
    },
  },
};

export default teacherResolver;
