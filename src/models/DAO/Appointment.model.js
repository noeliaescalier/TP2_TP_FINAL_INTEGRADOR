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
  appointmentDate: {
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

  getAppointmentsByDoctorAndDate = async (doctorId, dateString) => {
    try {
      const [year, month, day] = (dateString || "").split("-").map(Number);
      if (!year || !month || !day) {
        throw new Error("Fecha inválida, use el formato YYYY-MM-DD");
      }

      const startOfDay = new Date(year, month - 1, day);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);

      return await AppointmentModel.find({
        doctor: doctorId,
        appointmentDate: { $gte: startOfDay, $lt: endOfDay }
      }).select("appointmentDate time status");
    } catch (error) {
      console.error("Error al obtener turnos por médico y fecha:", error);
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

  cancelAppointmentsByIds = async (appointmentIds) => {
  try {
    const result = await AppointmentModel.updateMany(
      { _id: { $in: appointmentIds } },
      {
        $set: {
          status: "CANCELADO_MEDICO",
          cancellationReason: "los turnos para este dia fueron cancelados, debido a que el doctor canceló su agenda para el dia"
        }
      }
    );
    return result;
  } catch (error) {
    console.error("Error al cancelar los appointments:", error);
    throw error;
  }
};


}

export default Appointment;
