import { Request, Response } from "express";
import { adminService } from "./admin.services";
import pick from "../../shared/pick";
import { adminFilterableField } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const queryData = pick(req.query, adminFilterableField);
    const Option = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const getAllAdmin = await adminService.getAdmin(queryData, Option);
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
