import { Request, Response } from "express";
import { userServices } from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

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

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createDoctor(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor Created successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createPatient(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patient Created successfully!",
    data: result,
  });
});

export const userController = { createAdmin, createDoctor, createPatient };
