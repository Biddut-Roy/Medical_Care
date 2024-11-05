import express from "express";
import { adminController } from "./admin.Controller";

const router = express.Router();

router.get("/", adminController.getAllFromDB);
router.get("/:id", adminController.getByIdFromDB);

export const adminRoutes = router;
