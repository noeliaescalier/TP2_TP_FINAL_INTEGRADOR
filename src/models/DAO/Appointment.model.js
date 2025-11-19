import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorModel",
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel", // User con role = "PACIENTE"
    default: null
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [
      "LIBRE",
      "RESERVADO",
      "CANCELADO_PACIENTE",
      "CANCELADO_MEDICO",
      "ATENDIDO"
    ],
    default: "LIBRE"
  },
  createdAt: {
    type: Date,
    default: null
  },
  cancellationReason: {
    type: String,
    trim: true
  }
});

/*
appointmentSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
*/
const AppointmentModel = mongoose.model("AppointmentModel", appointmentSchema);


class Appointment  {
  constructor() {
    this.collection = "appointment";
  }

  getAppointment = async () => {
    try {
      return await AppointmentModel.find();
    } catch (error) {
      console.error("Error al obtener turnos:", error);
      throw error;
    }
  };

  getAppointmentsReserved = async () => {
    return await AppointmentModel.countDocuments({ status: "RESERVADO" });
  };

  getAppointmentsCancelled = async () => {
    return await AppointmentModel.countDocuments({ 
      status: { $in: ["CANCELADO_PACIENTE", "CANCELADO_MEDICO"] } 
    });
  };

  getAppointmentsAttended = async () => {
    return await AppointmentModel.countDocuments({ status: "ATENDIDO" });
  };

 

    postAppointment = async (app) => {
        const appointment = new AppointmentModel(app)
        const data = await appointment.save()
        return data; 
  };

}

export default Appointment;