import { Prisma, Subjects, Teachers } from "@prisma/client";

import { TeacherDto } from "../dtos/teacher.dto";

export type TeacherSubjects = Pick<Subjects, "id" | "name">;

export interface TeacherInterface {
  create: (teacherData: TeacherDto) => Promise<Teachers>;

  findAll: () => Promise<
    ({
      subjects: TeacherSubjects[];
    } & Teachers)[]
  >;

  getById: (id: number) => Promise<Teachers | null>;

  update: (id: number, data: Prisma.TeachersUpdateInput) => Promise<Teachers>;

  delete: (id: number) => Promise<Prisma.BatchPayload>;
}

export interface CreateTeacherInputData {
  createTeacherInput: TeacherDto;
}
