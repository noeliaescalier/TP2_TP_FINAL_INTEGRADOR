import DaoFactory from "../models/DAO/Dao.factory.clases.js";

const generateTimeSlots = (startTime, endTime, durationMin) => {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  const slots = [];

  for (let current = startMinutes; current + durationMin <= endMinutes; current += durationMin) {
    const hora = String(Math.floor(current / 60)).padStart(2, "0");
    const min = String(current % 60).padStart(2, "0");
    slots.push(`${hora}:${min}`); 
  }

  return slots;
};

class ScheduleTemplatesService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("ScheduleTemplate", persistence);
    this.appointmentModel = DaoFactory.get("Appointment", persistence);
    this.doctorModel = DaoFactory.get("Doctor", persistence);
  }

  getScheduleTemplates = async () => {
    const templates = await this.model.getScheduleTemplate();
    return templates;
  };


  createAppointmentsForSchedule = async (doctorId, startTime, endTime, slotDurationMin) => {
    const slots = generateTimeSlots(startTime, endTime, slotDurationMin);
    console.log("Slots generados:", slots);
    const createdAppointments = [];

    for (const time of slots) {
      const data = {
        doctor: doctorId,
        patient: null,
        time,
        status: "LIBRE",
        createdAt: null
      };

      const created = await this.appointmentModel.postAppointment(data);
      createdAppointments.push(created);
    }

    return createdAppointments;
  };


  postScheduleTemplate = async (template) => {
    
  const {doctor, startTime, endTime, slotDurationMin } = template;
  const doctorData = await this.doctorModel.getDoctorById(doctor);

  if (doctorData && doctorData.scheduleTemplate) {
  throw new Error("El doctor ya tiene una agenda");
  }

  const createdSchedule = await this.model.postScheduleTemplate(template);

    if (doctor && startTime && endTime && slotDurationMin) {
      try {
        const appointments = await this.createAppointmentsForSchedule(
          doctor,
          startTime,
          endTime,
          slotDurationMin
        );

        const appointmentIds = appointments.map((a) => a._id);

        if (appointmentIds.length > 0) {
          await this.model.patchScheduleTemplate(createdSchedule._id, {
            appointments: appointmentIds
          });
        }

        await this.doctorModel.patchDoctor(doctor, {
        scheduleTemplate: createdSchedule._id,
        });

      } catch (err) {
        console.error("Error al crear los appointments para el schedule:", err);
      }
    } else {
      console.warn(
        "Faltan campos para generar los appointments (doctor, startTime, endTime, slotDurationMin). Template recibido:",
        template
      );
    }

    return createdSchedule;
  };

  patchScheduleTemplate = async (id, scheduleTemplateData) => {
    const updatedScheduleTemplate = await this.model.patchScheduleTemplate(id, scheduleTemplateData);
    return updatedScheduleTemplate;
  };

  putScheduleTemplate = async (id, scheduleTemplateData) => {
    const updatedScheduleTemplate = await this.model.putScheduleTemplate(id, scheduleTemplateData);
    return updatedScheduleTemplate;
  };

  getScheduleTemplatesByDoctor = async (doctorId) => {
    const scheduleTemplates = await this.model.getScheduleTemplatesByDoctor(doctorId);
    return scheduleTemplates;
  };

  deleteScheduleTemplate = async (id) => {
    const deletedScheduleTemplate = await this.model.deleteScheduleTemplate(id);
    return deletedScheduleTemplate;
  };

}

export default ScheduleTemplatesService;
