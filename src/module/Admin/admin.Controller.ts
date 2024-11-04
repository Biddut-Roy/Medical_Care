import { Request, Response } from "express";
import { adminService } from "./admin.services";

const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
) => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && obj.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const queryData = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);
    const getAllAdmin = await adminService.getAdmin(queryData);
    res.status(200).json({
      success: true,
      massages: "Get All admin data",
      data: getAllAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      massages: error || "Error getting admin data",
      data: error,
    });
  }
};

export const adminController = {
  getAllFromDB,
};
