import express from "express";
import { userController } from "./user.Controller";
const router = express.Router();

router.post("/", userController.createAdmin);

export const userRoutes = router;
