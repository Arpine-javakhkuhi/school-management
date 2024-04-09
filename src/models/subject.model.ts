import { Prisma, Subjects, Teachers } from "@prisma/client";
import { GraphQLError } from "graphql";

import {
  CreateSubjectInput,
  SubjectInterface,
  SubjectsTeacher,
} from "../interfaces/subject.interface";
import prisma from "../config/prisma";

class SubjectModel implements SubjectInterface {
  async create(subjectData: CreateSubjectInput): Promise<Subjects | undefined> {
    const data: CreateSubjectInput = { name: subjectData.name };
    if (subjectData.teacherId) {
      data.teacherId = +subjectData.teacherId;
    }

    const subject = await prisma.subjects.create({
      data,
    });

    return subject;
  }

  async findAll(): Promise<
    ({
      teacher: SubjectsTeacher | null;
    } & Subjects)[]
  > {
    const subjects = await prisma.subjects.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    console.log("subjects", subjects);

    return subjects;
  }

  async getById(id: number) {
    return prisma.subjects.findUnique({
      where: {
        id,
      },
    });
  }

  //   async update(
  //     id: number,
  //     data: Prisma.TeachersUpdateInput
  //   ): Promise<Teachers> {
  //     const updatedData = { ...data };

  //     return prisma.teachers.update({
  //       where: {
  //         id,
  //       },
  //       data: updatedData,
  //     });
  //   }

  //   async delete(id: number): Promise<Prisma.BatchPayload> {
  //     return prisma.teachers.deleteMany({
  //       where: {
  //         id,
  //       },
  //     });
  //   }
}
const subjectModel = new SubjectModel();
export default subjectModel;
