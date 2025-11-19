import mongoose from "mongoose"

const doctorsSchema = mongoose.Schema({
    firstName : {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    specialty: {
        type: String,
        required: true,
        trim: true
    },
    province: {
        type: String,
        required: true,
        trim: true
    },
    neighborhood: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    scheduleTemplate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScheduleTemplateModel",
    default: null
  }
})

const DoctorModel = mongoose.model('DoctorModel', doctorsSchema)


class Doctor  {
  constructor() {
    this.collection = "doctors";
  }

  getDoctors = async () => {
    try {
      return await DoctorModel.find();
    } catch (error) {
      console.error("Error al obtener doctores:", error);
      throw error;
    }
  };

  getDoctorsWithStats = async () => {
    try {
        const docs = await DoctorModel.find().populate({
        path: 'scheduleTemplate',
        populate: { path: 'appointments' }
      });

      const processedDoctors = docs.map(doc => {
        const d = doc.toObject();
        const template = d.scheduleTemplate;

        let totalAppointments = 0;
        let agendaStatus = "Sin agenda";

        if (template) {
          if (template.status === "INACTIVO") {
            agendaStatus = "Inactiva";
          } else {
            const occupiedSlots = template.appointments.filter(
              app => app.status !== "LIBRE"
            );
            totalAppointments = occupiedSlots.length;

            
            const hasFreeSlots = template.appointments.some(
              app => app.status === "LIBRE"
            );
            
           
            agendaStatus = hasFreeSlots ? "Disponible" : "Completa";
          }
        }

      
        return {
          ...d,
          totalAppointments, 
          agendaStatus      
        };
      });

      return processedDoctors;

    } catch (error) {
      console.error("Error fetching doctors with stats:", error);
      throw error;
    }
  };

    postDoctors = async (doc) => {
        const doctor = new DoctorModel(doc)
        const data = await doctor.save()
        return data; 
  };

}

export default Doctor;