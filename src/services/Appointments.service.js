import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class AppointmentsService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("Appointment", persistence);
  }

  getAppointments = async () => {
    const appointments = await this.model.getAppointments();
    return appointments;
  }

  getAppointmentsStats = async () => {
    
    const [reserved, cancelled, attended] = await Promise.all([
        this.model.getAppointmentsReserved(),
        this.model.getAppointmentsCancelled(),
        this.model.getAppointmentsAttended(),
        
    ]);

    return {
        patientsToday: reserved,
        appointmentsCancelled: cancelled,
        patientsAttended: attended,
        totalSlots: reserved + cancelled + attended
    };
  }

  postAppointments = async (appointment) => {
    const created = await this.model.postAppointment(appointment);
    return created;
  }

  getAppointmentsReserved = async () => {
    const appointments = await this.model.getAppointmentsReserved();
    return appointments;
  }

  getAppointmentsCancelled = async () => {
    const appointments = await this.model.getAppointmentsCancelled();
    return appointments;
  }

  getAppointmentsAttended = async () => {
    const appointments = await this.model.getAppointmentsAttended();
    return appointments;
  }

  postAppointment = async (appointmentData) => {
    const newAppointment = await this.model.postAppointment(appointmentData);
    return newAppointment;
  }

  patchAppointment = async (id, appointmentData) => {
    const updatedAppointment = await this.model.patchAppointment(id, appointmentData);
    return updatedAppointment;
  }

  putAppointment = async (id, appointmentData) => {
    const updatedAppointment = await this.model.putAppointment(id, appointmentData);
    return updatedAppointment;
  }
}

export default AppointmentsService;