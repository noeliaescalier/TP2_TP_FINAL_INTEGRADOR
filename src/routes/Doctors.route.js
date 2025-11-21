import express from "express";
import DoctorsController from "../controllers/Doctors.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

class DoctorsRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new DoctorsController();
  }

  start() {
    this.router.use(authMiddleware.requireAuth);

    this.router.get("/doctors", this.controller.getDoctors);
    this.router.get("/doctors/stats", this.controller.getDoctorsWithStats);
    this.router.post("/doctors", validationMiddleware.validateRequiredFields(["firstName", "lastName", "specialty", "province", "neighborhood"]), this.controller.postDoctors);
    this.router.delete("/doctors/:id", validationMiddleware.validateId, this.controller.deleteDoctors);
    this.router.patch("/doctors/:id", validationMiddleware.validateId, this.controller.patchDoctors);
    this.router.put("/doctors/:id", validationMiddleware.validateId, this.controller.putDoctors);

    return this.router;
  }
}

export default DoctorsRoutes;
