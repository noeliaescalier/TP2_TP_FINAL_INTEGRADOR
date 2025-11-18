import express from "express";
import AppointmentsController from "../controllers/Appointments.controller.js";

class AppointmentsRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new AppointmentsController();
  }

  start() {
    this.router.get("/appointments", this.controller.getAppointments);
    this.router.get("/appointments/stats/dashboard", this.controller.getStats);
    this.router.post("/appointments", this.controller.postAppointments);

    return this.router;
  }
}

export default AppointmentsRoutes;