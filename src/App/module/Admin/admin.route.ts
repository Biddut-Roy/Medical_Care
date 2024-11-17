import express from "express";
import { adminController } from "./admin.Controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getAllFromDB
);

router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.getByIdFromDB
);

router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(AdminValidation.update),
  adminController.updateIntoDB
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.deleteFromDB
);

router.delete(
  "/soft/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminController.softDeleteFromDB
);

export const adminRoutes = router;
