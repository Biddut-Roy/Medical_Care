import express from "express";
import { userRoutes } from "../module/user/user.router";
import { adminRoutes } from "../module/Admin/admin.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
];

moduleRouter.forEach((routes) => router.use(routes.path, routes.route));

export default router;
