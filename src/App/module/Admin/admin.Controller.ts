import { Request, Response } from "express";
import { adminService } from "./admin.services";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const queryData = pick(req.query, adminFilterableField);
  const Option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const getAllAdmin = await adminService.getAdmin(queryData, Option);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get All admin data",
    meta: getAllAdmin.meta,
    data: getAllAdmin.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const getById = await adminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get a Data",
    data: getById,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req?.params;
  const data = req?.body;

  const getById = await adminService.updateIntoDB(id, data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data updated",
    data: getById,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data delete successfully",
    data: result,
  });
});

const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminService.softDeleteFromDB(id);

  // res.status(200).json({
  //   success: true,
  //   massages: "soft Data delete successfully",
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "soft Data delete successfully",
    data: result,
  });
});

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
