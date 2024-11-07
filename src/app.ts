import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./App/router";
import GlobalErrorHandler from "./App/middlewares/GlobalErrorHandler";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Started a Heath Care");
});

app.use("/api/v1", router);

//GlobalErrorHandler
app.use(GlobalErrorHandler);

export default app;
