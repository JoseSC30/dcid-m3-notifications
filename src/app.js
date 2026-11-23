import express from "express";
import cors from "cors";
import "dotenv/config";
import { log } from "./utils/logger.js";
import { errorHandler } from "./middleware/error.middleware.js";
import notificationRouter from "./routes/notification.routes.js";
export const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.get("/health", async (req, res) => {
  try {
    res.json({ status: "ok", service: process.env.SERVICE });
  } catch {
    res
      .status(503)
      .json({ status: "unavailable", service: process.env.SERVICE });
  }
});
app.use((req, res, next) => {
  log("info", `${req.method} ${req.path}`);
  next();
});
app.use(notificationRouter);
app.use(errorHandler);
