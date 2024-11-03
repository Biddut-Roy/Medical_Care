import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAdmin = async (params: any) => {
  const addCondition: Prisma.AdminWhereInput[] = [];
  if (params.searchTerm) {
    addCondition.push({
      OR: [
        {
          name: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: addCondition };
  const Result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return Result;
};

export const adminService = {
  getAdmin,
};
