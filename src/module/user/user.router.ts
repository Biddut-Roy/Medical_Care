import express from "express";
import { userController } from "./user.Controller";
const router = express.Router();

router.get("/", userController.createAdmin);

export const userRoutes = router;
