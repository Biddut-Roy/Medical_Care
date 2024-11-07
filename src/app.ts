import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./App/router";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Started a Heath Care");
});

app.use("/api/v1", router);

export default app;
