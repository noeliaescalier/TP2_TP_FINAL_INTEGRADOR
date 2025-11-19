import AppointmentsService from "../services/Appointments.service.js";

class AppointmentsController {
  constructor() {
    this.service = new AppointmentsService();
  }

  getAppointments = async (req, res) => {
    const appointments = await this.service.getAppointments();
    res.send(appointments);
  }

  getStats = async (req, res) => {
    try {
      const stats = await this.service.getAppointmentsStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  postAppointments = async (req, res) => {
    const appointment = req.body;
    const data = await this.service.postAppointments(appointment);
    res.send(data);
  }
}

export default AppointmentsController;