import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class ScheduleTemplatesService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("ScheduleTemplate", persistence);
  }

  getScheduleTemplates = async () => {
    const templates = await this.model.getScheduleTemplate();
    return templates;
  }

  postScheduleTemplates = async (template) => {
    const created = await this.model.postScheduleTemplate(template);
    return created;
  }
}

export default ScheduleTemplatesService;