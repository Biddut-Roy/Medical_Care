import { NextFunction, Request, Response } from "express";

const GlobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    success: false,
    massages: err.message || "SomeThing went Wrong",
    data: err,
  });
};

export default GlobalErrorHandler;
