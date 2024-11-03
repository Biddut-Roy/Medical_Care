import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const userData = {
    email: data.admin.email,
    password: data.password,
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
