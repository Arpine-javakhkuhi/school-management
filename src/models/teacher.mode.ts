import { Prisma, Teachers } from "@prisma/client";
import { GraphQLError } from "graphql";

import prisma from "../config/prisma";
import {
  TeacherInterface,
  TeacherSubjects,
} from "../interfaces/teacher.interface";
import { TeacherDto } from "../dtos/teacher.dto";
import { HTTPStatus } from "../types/main.types";
import errorMessages from "../constants/errorMessages";

class TeacherModel implements TeacherInterface {
  async create(teacherData: TeacherDto): Promise<Teachers> {
    const teacher = await prisma.teachers.create({
      data: {
        firstName: teacherData.firstName,
        lastName: teacherData.lastName,
      },
    });
    return teacher;
  }

  async findAll(): Promise<
    ({
      subjects: TeacherSubjects[];
    } & Teachers)[]
  > {
    return prisma.teachers.findMany({
      include: {
        subjects: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async getById(id: number) {
    return prisma.teachers.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.TeachersUpdateInput,
  ): Promise<Teachers> {
    const updatedData = { ...data };

    return prisma.teachers.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  async delete(id: number): Promise<Prisma.BatchPayload> {
    return prisma.teachers.deleteMany({
      where: {
        id,
      },
    });
  }
}

const teacherModel = new TeacherModel();
export default teacherModel;
