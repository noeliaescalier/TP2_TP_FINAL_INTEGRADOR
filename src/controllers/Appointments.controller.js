import AppointmentsService from "../services/Appointments.service.js";

class AppointmentsController {
  constructor() {
    this.service = new AppointmentsService();
  }

  getAppointments = async (req, res) => {
    try {
      const { doctor, date } = req.query;

      if (doctor || date) {
        if (!doctor || !date) {
          return res.status(400).json({ error: "Debe enviar doctor y date en formato YYYY-MM-DD" });
        }

        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
        if (!isValidDate) {
          return res.status(400).json({ error: "Fecha inválida. Use el formato YYYY-MM-DD" });
        }

        const appointments = await this.service.getAppointmentsByDoctorAndDate(doctor, date);
        return res.status(200).json(appointments);
      }

      const appointments = await this.service.getAppointments();
      return res.status(200).json(appointments);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getStats = async (req, res) => {
    try {
      const stats = await this.service.getAppointmentsStats();
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getAppointmentsReserved = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsReserved();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getAppointmentsCancelled = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsCancelled();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } 

  getAppointmentsAttended = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsAttended();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  postAppointment = async (req, res) => {
    try {
      const appointmentData = req.body;
      const newAppointment = await this.service.postAppointment(appointmentData);
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      await this.service.deleteAppointment(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  putAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAppointment = await this.service.putAppointment(id, updateData);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  patchAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAppointment = await this.service.putAppointment(id, updateData);
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

}

export default AppointmentsController;
