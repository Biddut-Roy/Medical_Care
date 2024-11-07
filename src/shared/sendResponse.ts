import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number | undefined;
      limit: number | undefined;
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

export default sendResponse;
