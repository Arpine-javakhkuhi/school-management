import SUCCESS_MESSAGES from "../constants/successMessages";
import { CreateTeacherInputData } from "../interfaces/teacher.interface";
import teacherModel from "../models/teacher.mode";
import createTeacherValidation from "../validators/createTeacher.validator";
import checkIfExists from "../utils/teacher.service";

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
      console.log("input createTeacher", createTeacherInput);
      await createTeacherValidation(createTeacherInput);

      const teacher = await teacherModel.create(createTeacherInput);
      return teacher;
    },

    deleteTeacher: async (_, { id }) => {
      console.log("id deleteTeacher", id);
      await checkIfExists(id);

      const { count } = await teacherModel.delete(id);
      return {
        isSuccess: !!count,
        message: SUCCESS_MESSAGES.teacherSuccessfullyDeleted,
      };
    },

    editTeacher: async (
      _,
      { id, editTeacherInput: { firstName, lastName } },
    ) => {
      console.log("id editTeacher", id);
      await checkIfExists(id);

      const newTeacher = await teacherModel.update(id, { firstName, lastName });

      return {
        isSuccess: !!newTeacher,
        message: SUCCESS_MESSAGES.teacherSuccessfullyUpdated,
      };
    },
  },
};

export default teacherResolver;
