import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchableField } from "./admin.constant";
import calculatePagination from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IAdminFilterRequest } from "./admin.interface";
import { IPaginationOptions } from "../../interfaces/pagination";

const getAdmin = async (
  params: IAdminFilterRequest,
  options: IPaginationOptions
) => {
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

  addCondition.push({
    isDeleted: false,
  });

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
      isDeleted: false,
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
      isDeleted: false,
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

const deleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.BLOCK,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const adminService = {
  getAdmin,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
