import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router();

route.post("/login", authController.userLogIn);

route.post("/refresh-token", authController.refreshToken);

export const authRoutes = route;
