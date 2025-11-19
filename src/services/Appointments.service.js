import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class AppointmentsService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("Appointment", persistence);
  }

  getAppointments = async () => {
    const appointments = await this.model.getAppointment();
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
}

export default AppointmentsService;