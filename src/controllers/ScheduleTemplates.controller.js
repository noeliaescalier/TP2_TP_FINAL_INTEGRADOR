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

  
/*
  getScheduleById = async (id) => {
    const data =  await this.service.getScheduleById(id);
    res.send(data)
  }

  patchScheduleTemplates = async (req, res) => {
      const { id } = req.params
      const template = req.body
      const data = await this.service.patchScheduleTemplate(id, template)
      res.send(data)
    }
*/

}


export default ScheduleTemplatesController;