import { Admin, Prisma } from "@prisma/client";
import { adminSearchableField } from "./admin.constant";
import calculatePagination from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";

const getAdmin = async (params: any, options: any) => {
  const { page, limit, skip } = calculatePagination(options);
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
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
  });

  const total = await prisma.admin.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: Result,
  };
};

const getByIdFromDB = async (id: string) => {
  const Result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return {
    data: Result,
  };
};

const updateIntoDB = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findFirstOrThrow({
    where: {
      id,
    },
  });

  const Result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return {
    data: Result,
  };
};

export const adminService = {
  getAdmin,
  getByIdFromDB,
  updateIntoDB,
};
