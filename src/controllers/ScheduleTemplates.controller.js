import ScheduleTemplatesService from "../services/ScheduleTemplates.service.js";

class ScheduleTemplatesController {
  constructor() {
    this.service = new ScheduleTemplatesService();
  }

 getScheduleTemplates = async (req, res) => {
    try {
      const scheduleTemplates = await this.service.getScheduleTemplates();
      res.status(200).json(scheduleTemplates);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  postScheduleTemplate = async (req, res) => {
    try {
      const scheduleTemplateData = req.body;
      const newScheduleTemplate = await this.service.postScheduleTemplate(scheduleTemplateData);
      res.status(201).json(newScheduleTemplate);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  patchScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleTemplateData = req.body;
      const updatedScheduleTemplate = await this.service.patchScheduleTemplate(id, scheduleTemplateData);
      res.status(200).json(updatedScheduleTemplate);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getScheduleTemplatesByDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const scheduleTemplates = await this.service.getScheduleTemplatesByDoctor(doctorId);
      res.status(200).json(scheduleTemplates);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  putScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleTemplateData = req.body;
      const updatedScheduleTemplate = await this.service.putScheduleTemplate(id, scheduleTemplateData);
      res.status(200).json(updatedScheduleTemplate);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  deleteScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedScheduleTemplate = await this.service.deleteScheduleTemplate(id);
      res.status(200).json(deletedScheduleTemplate);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }


}


export default ScheduleTemplatesController;