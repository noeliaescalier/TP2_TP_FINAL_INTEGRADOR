import express from "express";
import ScheduleTemplatesController from "../controllers/ScheduleTemplates.controller.js";

class ScheduleTemplatesRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new ScheduleTemplatesController();
  }

  start() {
    this.router.get("/schedule-templates", this.controller.getScheduleTemplates);
    this.router.post("/schedule-templates", this.controller.postScheduleTemplates);

    return this.router;
  }
}

export default ScheduleTemplatesRoutes;