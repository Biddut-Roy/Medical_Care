import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

const createAdmin = async (data: any) => {
  const hasPassword = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hasPassword,
    role: UserRole.ADMIN,
  };

  const Result = await prisma.$transaction(async (tsx) => {
    const createUser = await tsx.user.create({
      data: userData,
    });

    const createAdmin = await tsx.admin.create({
      data: data.admin,
    });

    return createAdmin;
  });

  return Result;
};

export const userServices = {
  createAdmin,
};
