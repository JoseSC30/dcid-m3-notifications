import { validateNotification } from "../models/notification.model.js";
import { auth, internal } from "../middleware/auth.middleware.js";
import { call } from "../services/http.service.js";
import { log } from "../utils/logger.js";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
});
export function registerNotificationRoutes(router) {
  router.post("/notifications/send", internal, async (req, res, next) => {
    try {
      const { to, order_id, tickets = [] } = req.body;
      if (!to || !order_id)
        return res
          .status(400)
          .json({ error: "Destinatario y orden obligatorios" });
      validateNotification({ to, order_id, tickets });
      await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to,
        subject: "Compra confirmada " + order_id,
        text:
          "Tu compra está confirmada. Entra a Mis entradas para descargar tus PDF.\n" +
          tickets.join("\n"),
      });
      res.json({ sent: true });
    } catch (e) {
      next(e);
    }
  });
}
