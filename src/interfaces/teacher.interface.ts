import { Subjects, Teachers } from "@prisma/client";

import { TeacherDto } from "../dtos/teacher.dto";

export type TeacherSubjects = Pick<Subjects, "id" | "name">;

export interface TeacherInterface {
  create: (teacherData: TeacherDto) => Promise<Teachers>;

  findAll: () => Promise<
    ({
      subjects: TeacherSubjects[];
    } & Teachers)[]
  >;
}

export interface CreateTeacherInputData {
  createTeacherInput: TeacherDto;
}
