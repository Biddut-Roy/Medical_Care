import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchableField } from "./admin.constant";

const prisma = new PrismaClient();

const getAdmin = async (params: any, option: any) => {
  const { page, limit } = option;
  const { searchTerm, ...filterData } = params;

  const addCondition: Prisma.AdminWhereInput[] = [];
  //   if (params.searchTerm) {
  //     addCondition.push({
  //       OR: [
  //         {
  //           name: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           email: {
  //             contains: params.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],
  //     });
  //   }

  //   if (params.searchTerm) {
  //     addCondition.push({
  //       OR: ["name", "email"].map((field) => ({
  //         [field]: {
  //           contains: params.searchTerm,
  //           mode: "insensitive",
  //         },
  //       })),
  //     });
  //   }

  const SearchFields = adminSearchableField;

  if (params.searchTerm) {
    addCondition.push({
      OR: SearchFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AdminWhereInput = { AND: addCondition };

  const Result = await prisma.admin.findMany({
    where: whereCondition,
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),
  });
  return Result;
};

export const adminService = {
  getAdmin,
};
