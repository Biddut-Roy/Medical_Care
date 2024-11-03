import { Request, Response } from "express";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  const Result = await userServices.createAdmin(req.body);
  res.send(Result);
};

export const userController = { createAdmin };
