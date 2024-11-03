import { Request, Response } from "express";
import { adminService } from "./admin.services";

const getAdmin = async (req: Request, res: Response) => {
  try {
    const getAllAdmin = await adminService.getAdmin(req.query);
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
  getAdmin,
};
