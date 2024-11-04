import express from "express";
import { adminController } from "./admin.Controller";

const router = express.Router();

router.get("/", adminController.getAllFromDB);

export const adminRoutes = router;
