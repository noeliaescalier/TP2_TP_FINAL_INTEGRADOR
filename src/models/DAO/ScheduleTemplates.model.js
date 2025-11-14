import mongoose from "mongoose";

const scheduleTemplateSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorModel",
    required: true
  },
  dayOfWeek: {
    type: Number,
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
  validFrom: {
    type: Date
  },
  validTo: {
    type: Date
  },
  status: {
    type: String,
    enum: ["ACTIVO", "INACTIVO"],
    default: "ACTIVO"
  }
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
      console.error("Error al obtener la agenda de turnos:", error);
      throw error;
    }
  };

    postScheduleTemplate = async (stp) => {
        const st = new ScheduleTemplateModel(stp)
        const data = await st.save()
        return data; 
  };

}

export default ScheduleTemplate;