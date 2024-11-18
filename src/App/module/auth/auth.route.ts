import { Router } from "express";
import { authController } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const route = Router();

route.post("/login", authController.userLogIn);

route.post("/refresh-token", authController.refreshToken);

route.post(
  "/change-password",
  auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT, UserRole.SUPER_ADMIN),
  authController.changePassword
);

route.post("/forgot-password", authController.forgotPassword);

route.post("/reset-password", authController.resetPassword);

export const authRoutes = route;
