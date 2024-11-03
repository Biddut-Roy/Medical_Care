import express, { Application, Request, Response } from "express";
import cors from "cors";
import { userRoutes } from "./module/user/user.router";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Started a Helth Care");
});

app.use("/api/v1/user/", userRoutes);

export default app;
