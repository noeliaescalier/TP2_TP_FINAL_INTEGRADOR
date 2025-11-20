import DaoFactory from "../models/DAO/Dao.factory.clases.js";
import { sendEmail } from "./email.service.js";

class AppointmentsService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("Appointment", persistence);
    this.user = DaoFactory.get("User", persistence);
    this.doctor = DaoFactory.get("Doctor", persistence);
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
     try {
        
        const patient = await this.user.getUserById(appointmentData.patient);
        const doctor = await this.doctor.getDoctorById(appointmentData.doctor);

        if (patient && patient.email) {
            const subject = "Turni: Confirmación de Reserva";
            
            
            const html = `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #0056b3; padding: 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">TURNI</h1>
                    </div>
                    
                    <div style="padding: 30px;">
                        <h2 style="color: #0056b3; margin-top: 0;">¡Hola ${patient.firstName}!</h2>
                        <p style="font-size: 16px; line-height: 1.5;">Tu turno ha sido reservado exitosamente. A continuación te dejamos los detalles para que no te olvides:</p>
                        
                        <div style="background-color: #f8f9fa; border-left: 4px solid #00c6ff; padding: 15px; margin: 20px 0;">
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 10px;"><strong>👨‍⚕️ Profesional:</strong> Dr/a. ${doctor.firstName} ${doctor.lastName}</li>
                                <li style="margin-bottom: 10px;"><strong>🏥 Especialidad:</strong> ${doctor.specialty}</li>
                                <li style="margin-bottom: 10px;"><strong>📅 Horario:</strong> ${appointmentData.time}</li>
                                <li style="margin-bottom: 0;"><strong>📍 Ubicación:</strong> ${doctor.address}, ${doctor.neighborhood}</li>
                            </ul>
                        </div>
                        
                        <p style="font-size: 14px; color: #666;">Si necesitás cancelar o reprogramar, podés hacerlo desde la plataforma.</p>
                    </div>
                    
                    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
                        <p style="margin: 0;">Enviado automáticamente por el sistema de reservas <strong>Turni</strong>.</p>
                    </div>
                </div>
            `;
            
           
            await sendEmail(patient.email, subject, html);
            console.log(`📧 Notificación de Turni enviada a ${patient.email}`);
        }
    } catch (error) {
        
        console.error("⚠️ Error enviando notificación:", error.message);
    }

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