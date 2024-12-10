import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./App/router";
import GlobalErrorHandler from "./App/middlewares/GlobalErrorHandler";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { AppointmentService } from "./App/module/Appointment/appointment.service";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

cron.schedule("* * * * *", () => {
  try {
    AppointmentService.cancelUnpaidAppointments();
  } catch (err) {
    console.error(err);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Started a Heath Care");
});

app.use("/api/v1", router);

//GlobalErrorHandler
app.use(GlobalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    messages: "API Not Found",
    Error: {
      path: req.originalUrl,
    },
  });
});

export default app;
