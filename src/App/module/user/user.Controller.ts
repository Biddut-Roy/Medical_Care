import { Request, Response } from "express";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const Result = await userServices.createAdmin(req.body);
    res.status(200).json({
      success: "true",
      massage: " Admin create Successfully",
      data: Result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: "false",
      massage: error?.name || " Admin create Successfully",
      data: error,
    });
  }
};

export const userController = { createAdmin };
