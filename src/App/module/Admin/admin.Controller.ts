import { Request, Response } from "express";
import { adminService } from "./admin.services";
import { adminFilterableField } from "./admin.constant";
import pick from "../../../shared/pick";

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
    data: T | null;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData.meta || null,
    data: jsonData.data || null,
  });
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const queryData = pick(req.query, adminFilterableField);
    const Option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

    const getAllAdmin = await adminService.getAdmin(queryData, Option);

    res.status(200).json({
      success: true,
      massages: "Get All admin data",
      meta: getAllAdmin.meta,
      data: getAllAdmin.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massages: error || "Error getting admin data",
      data: error,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const getById = await adminService.getByIdFromDB(id);
    res.status(200).json({
      success: true,
      massages: "Get a Data",
      data: getById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massages: error || "Error getting admin data",
      data: error,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  const { id } = req?.params;
  const data = req?.body;

  try {
    const getById = await adminService.updateIntoDB(id, data);
    res.status(200).json({
      success: true,
      massages: "Admin data updated",
      data: getById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massages: error || "Error getting admin data updated",
      data: error,
    });
  }
};

const deleteFromDB = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await adminService.deleteFromDB(id);
  res.status(200).json({
    success: true,
    massages: "Data delete successfully",
    data: result,
  });
};

const softDeleteFromDB = async (req: Request, res: Response) => {
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
};

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
