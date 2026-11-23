import { Router } from "express";
import { registerNotificationRoutes } from "../controllers/notification.controller.js";
const router = Router();
registerNotificationRoutes(router);
export default router;
