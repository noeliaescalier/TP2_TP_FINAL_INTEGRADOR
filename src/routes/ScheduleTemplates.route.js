import express from "express";
import ScheduleTemplatesController from "../controllers/ScheduleTemplates.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

class ScheduleTemplatesRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new ScheduleTemplatesController();
  }

  start() {
    this.router.use(authMiddleware.requireAuth);

    this.router.get("/schedule-templates", this.controller.getScheduleTemplates);
    this.router.get("/schedule-templates/doctor/:doctorId", this.controller.getScheduleTemplatesByDoctor);
    this.router.put("/schedule-templates/:id", validationMiddleware.validateId, this.controller.putScheduleTemplate);
    this.router.delete("/schedule-templates/:id", this.controller.deleteScheduleTemplate);
    this.router.post("/schedule-templates", validationMiddleware.validateId, validationMiddleware.validateRequiredFields(["doctor", "daysOfWeek", "startTime", "endTime"]), this.controller.postScheduleTemplate);
    this.router.patch("/schedule-templates/:id", validationMiddleware.validateId, this.controller.patchScheduleTemplate);


    return this.router;
  }
}

export default ScheduleTemplatesRoutes;
