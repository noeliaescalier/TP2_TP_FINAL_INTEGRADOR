import mongoose from "mongoose";

const scheduleTemplateSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorModel",
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true,
    trim: true
  },
  endTime: {
    type: String,
    required: true,
    trim: true
  },
  slotDurationMin: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    default: "ACTIVO"
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
     ref: "AppointmentModel"
  }
 ]
});

const ScheduleTemplateModel = mongoose.model("ScheduleTemplateModel", scheduleTemplateSchema);


class ScheduleTemplate  {
  constructor() {
    this.collection = "scheduleTemplates";
  }

  getScheduleTemplate = async () => {
    try {
      return await ScheduleTemplateModel.find();
    } catch (error) {
      console.error("Error al obtener el schedule de appointments:", error);
      throw error;
    }
  }

    postScheduleTemplate = async (stp) => {
    try {
      const newScheduleTemplate = new ScheduleTemplateModel(stp);
      return await newScheduleTemplate.save();
    } catch (error) {
      console.error("Error al crear el schedule de appointments:", error);
      throw error;
    }
  };

    patchScheduleTemplate = async (id, stp) => {
    try {
      const updated = await ScheduleTemplateModel.findByIdAndUpdate(
        id,
        { $set: stp },
        { new: true }
      );
      return updated;
    } catch (error) {
      console.error("Error al actualizar el schedule de appointments:", error);
      throw error;
    }
  };

  getScheduleTemplatesByDoctor = async (doctorId) => {
    try {
      return await ScheduleTemplateModel.find({ doctor: doctorId });
    } catch (error) {
      console.error("Error al obtener los schedule templates por doctor:", error);
      throw error;
    }
  };

   deleteScheduleTemplate = async (id) => {
    try {
      const deleted = await ScheduleTemplateModel.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      console.error("Error al eliminar el schedule template:", error);
      throw error;
    }
  }

  putScheduleTemplate = async (id, scheduleTemplateData) => {
    try {
      const updatedScheduleTemplate = await ScheduleTemplateModel.findByIdAndUpdate(  
        id,
        scheduleTemplateData,
        { new: true }
      );
      return updatedScheduleTemplate;
    } catch (error) {
      console.error("Error al reemplazar el schedule template:", error);
      throw error;
    }
  }

}


export default ScheduleTemplate;