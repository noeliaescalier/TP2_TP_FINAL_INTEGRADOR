import AppointmentsService from "../services/Appointments.service.js";

class AppointmentsController {
  constructor() {
    this.service = new AppointmentsService();
  }

  getAppointments = async (req, res) => {
    try {
      const appointments = await this.service.getAppointments();
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }

  getStats = async (req, res) => {
    try {
      const stats = await this.service.getAppointmentsStats();
      res.status(200).json({
        status: 'success',
        data: stats
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  getAppointmentsReserved = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsReserved();
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  getAppointmentsCancelled = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsCancelled();
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  } 

  getAppointmentsAttended = async (req, res) => {
    try {
      const appointments = await this.service.getAppointmentsAttended();
      res.status(200).json({
        status: 'success',
        data: appointments
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  postAppointment = async (req, res) => {
    try {
      const appointmentData = req.body;
      const newAppointment = await this.service.postAppointment(appointmentData);
      res.status(201).json({
        status: 'success',
        data: newAppointment
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  deleteAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      await this.service.deleteAppointment(id);
      res.status(204).json({
        status: 'success',
        message: 'Appointment deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  putAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAppointment = await this.service.putAppointment(id, updateData);
      res.status(200).json({
        status: 'success',
        data: updatedAppointment
      });
    } catch (error) {
      res.status(500).send({ 
        status: 'error',
        message: error.message
       });
    }
  }

  patchAppointment = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedAppointment = await this.service.putAppointment(id, updateData);
      res.status(200).json({
        status: 'success',
        data: updatedAppointment
      });
    } catch (error) {
      res.status(500).send({ 
        status: 'error',
        message: error.message
       });
    }
  }

}

export default AppointmentsController;