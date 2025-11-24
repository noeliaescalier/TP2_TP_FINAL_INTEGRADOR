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

  getAppointments = async () => {
    try {
      return await AppointmentModel.find();
    } catch (error) {
      console.error("Error al obtener turnos:", error);
      throw error;
    }
  };

  getAppointmentsCountByStatus = async (statusList) => {
    try {
        return await AppointmentModel.countDocuments({ 
        status: { $in: statusList } 
      });
    } catch (error) {
      console.error(`Error al contar turnos con status ${statusList}:`, error);
      throw error;
    }
  };
  
  postAppointment = async (appointmentData) => {
   try {
      const newAppointment = new AppointmentModel(appointmentData);
      return await newAppointment.save();
    } catch (error) {
      console.error("Error al crear el turno:", error);
      throw error;
    }
  };

  putAppointment = async (appointmentId, updateData) => {
    try {
      return await AppointmentModel.findByIdAndUpdate(
        appointmentId,
        updateData,
        { new: true }
      );
    } catch (error) {
      console.error("Error al actualizar el turno:", error);
      throw error;
    }
  };

  deleteAppointment = async (appointmentId) => {
    try {
      return await AppointmentModel.findByIdAndDelete(appointmentId);
    } catch (error) {
      console.error("Error al eliminar el turno:", error);
      throw error;
    }
  };

  patchAppointment = async (appointmentId, patchData) => {
    try {
      return await AppointmentModel.findByIdAndUpdate(
        appointmentId,
        { $set: patchData },
        { new: true }
      );
    } catch (error) {
      console.error("Error al modificar el turno:", error);
      throw error;
    }
  };



}

export default Appointment;