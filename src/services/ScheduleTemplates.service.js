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


  createAppointmentsForSchedule = async (doctorId, scheduledDateObj, startTime, endTime, slotDurationMin) => {
    const slots = generateTimeSlots(startTime, endTime, slotDurationMin);
    const createdAppointments = [];

    for (const time of slots) {
      const [hour, minute] = time.split(":").map(Number);

      const dateTime = new Date(scheduledDateObj);
      dateTime.setHours(hour, minute, 0, 0);

      const data = {
        doctor: doctorId,
        patient: null,
        appointmentDate: dateTime,
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
    const { doctor, scheduledDate, startTime, endTime, slotDurationMin } = template;

    const [year, month, day] = scheduledDate.split("-").map(Number);
    const scheduledDateObj = new Date(year, month - 1, day);
    scheduledDateObj.setHours(0, 0, 0, 0);

    template.scheduledDate = scheduledDateObj;

    const doctorData = await this.doctorModel.getDoctorById(doctor);
    if (!doctorData) {
      throw new Error("Doctor no encontrado");
    }

    const existingSchedules = await this.model.getScheduleTemplatesByDoctor(doctor);

    const newDate = new Date(scheduledDateObj);
    newDate.setHours(0, 0, 0, 0);

    const existsSameDayAndExactRange = existingSchedules.some((sch) => {
      const d = new Date(sch.scheduledDate);
      d.setHours(0, 0, 0, 0);

      const sameDay = d.getTime() === newDate.getTime();
      if (!sameDay) return (false);

      const sameStart = sch.startTime === startTime;
      const sameEnd = sch.endTime === endTime;

      return (sameStart && sameEnd);
    });

    if (existsSameDayAndExactRange) {
      throw new Error("El doctor ya tiene una agenda para ese día y esa misma franja horaria");
    }

    const createdSchedule = await this.model.postScheduleTemplate(template);

    try {
      const appointments = await this.createAppointmentsForSchedule(
        doctor,
        scheduledDateObj,
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

      const currentTemplates = Array.isArray(doctorData.scheduleTemplate)
        ? doctorData.scheduleTemplate
        : (doctorData.scheduleTemplate ? [doctorData.scheduleTemplate] : []);

      await this.doctorModel.patchDoctor(doctor, {
        scheduleTemplate: [...currentTemplates, createdSchedule._id]
      });
    } catch (err) {
      console.error("Error al crear los appointments para el schedule:", err);
    }

    return (createdSchedule);
  };

  patchScheduleTemplate = async (id, scheduleTemplateData) => {
  const updatedScheduleTemplate = await this.model.patchScheduleTemplate(id, scheduleTemplateData);

  if (
    updatedScheduleTemplate &&
    scheduleTemplateData.status === "INACTIVO" &&
    Array.isArray(updatedScheduleTemplate.appointments) &&
    updatedScheduleTemplate.appointments.length > 0
  ) {
    try {
      await this.appointmentModel.cancelAppointmentsByIds(updatedScheduleTemplate.appointments);
    } catch (error) {
      console.error("Error al cancelar los turnos al desactivar la agenda:", error);
    }
  }

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
