import { Request, Response } from "express";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const Result = await userServices.createAdmin(req);
    res.status(200).json({
      success: "true",
      massage: " Admin create Successfully",
      data: Result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: "false",
      massage: error?.name || " Admin create Fail",
      data: error,
    });
  }
};

export const userController = { createAdmin };
