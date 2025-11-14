import ScheduleTemplatesService from "../services/ScheduleTemplates.service.js";

class ScheduleTemplatesController {
  constructor() {
    this.service = new ScheduleTemplatesService();
  }

  getScheduleTemplates = async (req, res) => {
    const templates = await this.service.getScheduleTemplates();
    res.send(templates);
  }

  postScheduleTemplates = async (req, res) => {
    const template = req.body;
    const data = await this.service.postScheduleTemplates(template);
    res.send(data);
  }
}

export default ScheduleTemplatesController;