import express from "express";
import { userRoutes } from "../module/user/user.router";
import { adminRoutes } from "../module/Admin/admin.route";
import { authRoutes } from "../module/auth/auth.route";
import { SpecialtiesRoutes } from "../module/Specialties/specialties.routes";
import { DoctorRoutes } from "../module/Doctor/doctor.routes";
import { PatientRoutes } from "../module/Patient/patient.route";
import { ScheduleRoutes } from "../module/Schedule/schedule.routes";
import { DoctorScheduleRoutes } from "../module/DoctorSchedule/doctorSchedule.routes";
import { AppointmentRoutes } from "../module/Appointment/appointment.routes";
import { PaymentRoutes } from "../module/Payment/payment.routes";

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
  {
    path: "/patient",
    route: PatientRoutes,
  },
  {
    path: "/schedule",
    route: ScheduleRoutes,
  },
  {
    path: "/doctor-schedule",
    route: DoctorScheduleRoutes,
  },
  {
    path: "/appointment",
    route: AppointmentRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];

moduleRouter.forEach((routes) => router.use(routes.path, routes.route));

export default router;
