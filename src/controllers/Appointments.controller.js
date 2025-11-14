import AppointmentsService from "../services/Appointments.service.js";

class AppointmentsController {
  constructor() {
    this.service = new AppointmentsService();
  }

  getAppointments = async (req, res) => {
    const appointments = await this.service.getAppointments();
    res.send(appointments);
  }

  postAppointments = async (req, res) => {
    const appointment = req.body;
    const data = await this.service.postAppointments(appointment);
    res.send(data);
  }
}

export default AppointmentsController;