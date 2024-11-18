import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authServices } from "./auth.services";
import sendResponse from "../../../shared/sendResponse";

const userLogIn = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.userLogIn(req.body);
  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "login user successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Access token genereated successfully!",
    data: result,
    // data: {
    //     accessToken: result.accessToken,
    //     needPasswordChange: result.needPasswordChange
    // }
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await authServices.changePassword(req.user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "password change successfully!",
      data: result,
    });
  }
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await authServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Check your email!",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await authServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password Reset!",
    data: null,
  });
});

export const authController = {
  userLogIn,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
