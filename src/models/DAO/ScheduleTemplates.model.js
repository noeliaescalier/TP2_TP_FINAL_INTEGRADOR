import mongoose from "mongoose";

const scheduleTemplateSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DoctorModel",
    required: true
  },
  daysOfWeek: {
    type: [Number],
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
      console.error("Error al obtener el schedule de :appointments", error);
      throw error;
    }
  }

    postScheduleTemplate = async (stp) => {
        const st = new ScheduleTemplateModel(stp)
        const data = await st.save()
        return data; 
  }

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


  /*
  getScheduleById= async (id) => {
      const schedule = await ScheduleTemplateModel.findById(id);
      return schedule;
  };
*/

}


export default ScheduleTemplate;