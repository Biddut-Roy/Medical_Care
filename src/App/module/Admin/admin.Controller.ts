import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.services";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";

const getAllFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queryData = pick(req.query, adminFilterableField);
  const Option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  try {
    const getAllAdmin = await adminService.getAdmin(queryData, Option);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get All admin data",
      meta: getAllAdmin.meta,
      data: getAllAdmin.data,
    });
  } catch (error) {
    next(error);
  }
};

const getByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const getById = await adminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get a Data",
      data: getById,
    });
  } catch (error) {
    next(error);
  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req?.params;
  const data = req?.body;

  try {
    const getById = await adminService.updateIntoDB(id, data);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Admin data updated",
      data: getById,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Data delete successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
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
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
