import express from "express";
import AppointmentsController from "../controllers/Appointments.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

class AppointmentsRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new AppointmentsController();
  }

  start() {
    this.router.use(authMiddleware.requireAuth);

    this.router.get("/appointments", this.controller.getAppointments);
    this.router.get("/appointments/stats/dashboard", this.controller.getAppointmentCountByStatus);
    this.router.post("/appointments", validationMiddleware.validateRequiredFields(["doctor", "patient", "time"]), this.controller.postAppointment);
    this.router.patch("/appointments/:id", validationMiddleware.validateId, this.controller.patchAppointment);
    this.router.put("/appointments/:id", validationMiddleware.validateId, this.controller.putAppointment);
    this.router.delete("/appointments/:id", validationMiddleware.validateId, this.controller.deleteAppointment);

    return this.router;
  }
}

export default AppointmentsRoutes;
