import express from "express";
import { adminController } from "./admin.Controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", adminController.getAllFromDB);

router.get("/:id", adminController.getByIdFromDB);

router.patch(
  "/:id",
  validateRequest(AdminValidation.update),
  adminController.updateIntoDB
);

router.delete("/:id", adminController.deleteFromDB);

router.delete("/soft/:id", adminController.softDeleteFromDB);

export const adminRoutes = router;
