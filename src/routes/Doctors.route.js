import express from "express";
import DoctorsController from "../controllers/Doctors.controller.js";

class DoctorsRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new DoctorsController();
  }

  start() {
    this.router.get("/doctors", this.controller.getDoctors);
    this.router.post("/doctors", this.controller.postDoctors);

    return this.router;
  }
}

export default DoctorsRoutes;
