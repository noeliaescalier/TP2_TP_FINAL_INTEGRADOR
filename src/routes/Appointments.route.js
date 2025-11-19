import express from "express";
import AppointmentsController from "../controllers/Appointments.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class AppointmentsRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new AppointmentsController();
  }

  start() {
    this.router.get("/appointments", this.controller.getAppointments);
    this.router.get("/appointments/stats/dashboard", this.controller.getStats);
    this.router.post("/appointments", validationMiddleware.validateRequiredFields(["doctor", "patient", "time"]), this.controller.postAppointment);
    this.router.get("/appointments/reserved", this.controller.getAppointmentsReserved);
    this.router.get("/appointments/cancelled", this.controller.getAppointmentsCancelled);
    this.router.get("/appointments/attended", this.controller.getAppointmentsAttended);
    this.router.patch("/appointments/:id", validationMiddleware.validateId, this.controller.patchAppointment);
    this.router.put("/appointments/:id", validationMiddleware.validateId, this.controller.putAppointment);
    this.router.delete("/appointments/:id", validationMiddleware.validateId, this.controller.deleteAppointment);

    return this.router;
  }
}

export default AppointmentsRoutes;