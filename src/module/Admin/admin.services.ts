import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAdmin = async (params: any) => {
  const Result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
          email: {
            contains: params.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return Result;
};

export const adminService = {
  getAdmin,
};
