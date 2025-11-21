import ScheduleTemplatesService from "../services/ScheduleTemplates.service.js";
import LoginService from "../services/Login.service.js";
import authMiddleware from "../middleware/jwt.middleware.js";


class ScheduleTemplatesController {
  constructor() {
    this.service = new ScheduleTemplatesService();
  }

  postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await LoginService.loginUser(email, password);
      if (user) {
        const token = authMiddleware.generateToken({ user: user.email, role: user.role });
        res.status(200).json({
          status: 'success',
          data: { user, token }
        });
      } else {
        res.status(401).json({ 
          status: 'error',
          message: 'Invalid credentials (user not found or wrong password)'
         });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }

  }


 getScheduleTemplates = async (req, res) => {
    try {
      const scheduleTemplates = await this.service.getScheduleTemplates();
      res.status(200).json({
        status: 'success',
        data: scheduleTemplates
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  postScheduleTemplate = async (req, res) => {
    try {
      const scheduleTemplateData = req.body;
      const newScheduleTemplate = await this.service.postScheduleTemplate(scheduleTemplateData);
      res.status(201).json({
        status: 'success',
        data: newScheduleTemplate
      });
    } catch (error) {
      res.status(500).send({ 
        status: 'error',
        message: error.message
       });
    }
  }

  patchScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleTemplateData = req.body;
      const updatedScheduleTemplate = await this.service.patchScheduleTemplate(id, scheduleTemplateData);
      res.status(200).json({
        status: 'success',
        data: updatedScheduleTemplate
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  getScheduleTemplatesByDoctor = async (req, res) => {
    try {
      const { doctorId } = req.params;
      const scheduleTemplates = await this.service.getScheduleTemplatesByDoctor(doctorId);
      res.status(200).json({
        status: 'success',
        data: scheduleTemplates
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  putScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const scheduleTemplateData = req.body;
      const updatedScheduleTemplate = await this.service.putScheduleTemplate(id, scheduleTemplateData);
      res.status(200).json({
        status: 'success',
        data: updatedScheduleTemplate
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  deleteScheduleTemplate = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedScheduleTemplate = await this.service.deleteScheduleTemplate(id);
      res.status(200).json({
        status: 'success',
        data: deletedScheduleTemplate
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }
}


export default ScheduleTemplatesController;