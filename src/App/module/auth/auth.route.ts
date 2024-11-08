import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router();

route.post("/login", authController.userLogIn);

export const authRoutes = route;
