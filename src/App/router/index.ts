import express from "express";
import { userRoutes } from "../module/user/user.router";
import { adminRoutes } from "../module/Admin/admin.route";
import { authRoutes } from "../module/auth/auth.route";
import { SpecialtiesRoutes } from "../module/Specialties/specialties.routes";
import { DoctorRoutes } from "../module/Doctor/doctor.routes";

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
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/specialties",
    route: SpecialtiesRoutes,
  },
  {
    path: "/doctor",
    route: DoctorRoutes,
  },
];

moduleRouter.forEach((routes) => router.use(routes.path, routes.route));

export default router;
