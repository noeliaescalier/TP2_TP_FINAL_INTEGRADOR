import mongoose from "mongoose"

const doctorsSchema = mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
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
    scheduleTemplate: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "ScheduleTemplateModel",
    default: null
  }]
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
                
                
                const templates = Array.isArray(d.scheduleTemplate) ? d.scheduleTemplate : [];

                let totalAppointments = 0;
                let hasActiveSchedule = false; 
                let isAvailable = false;       

                
                templates.forEach(template => {
                    
                    if (template && template.status !== "INACTIVO") {
                        hasActiveSchedule = true;

                        
                        const appointmentsList = Array.isArray(template.appointments) ? template.appointments : [];

                       
                        const occupiedInThisTemplate = appointmentsList.filter(app => app.status !== "LIBRE").length;
                        totalAppointments += occupiedInThisTemplate;

                       
                        const hasFreeInThisTemplate = appointmentsList.some(app => app.status === "LIBRE");
                        if (hasFreeInThisTemplate) {
                            isAvailable = true;
                        }
                    }
                });

                
                let agendaStatus = "Sin agenda";

                if (hasActiveSchedule) {
                    
                    agendaStatus = isAvailable ? "Disponible" : "Completa";
                } else if (templates.length > 0) {
                   
                    agendaStatus = "Inactiva";
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

   postDoctor = async (doctorData) => {
    try {
      const doctor = new DoctorModel(doctorData);
      const savedDoctor = await doctor.save();
      return savedDoctor;
    } catch (error) {
      console.error("Error al crear doctor:", error);
      throw error;
    }
  };

  deleteDoctor = async (id) => {
    try {
      const result = await DoctorModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error("Error al eliminar doctor:", error);
      throw error;
    }
  };
  patchDoctor = async (id, doctorData) => {
    try {
      const updatedDoctor = await DoctorModel.findByIdAndUpdate(
        id,
        { $set: doctorData },
        { new: true }
      );
      return updatedDoctor;
    } catch (error) {
      console.error("Error al actualizar doctor:", error);
      throw error;
    } 
  };

  putDoctor = async (id, doctorData) => {
    try {
      const updatedDoctor = await DoctorModel.findByIdAndUpdate(
        id,
        { $set: doctorData },
        { new: true }
      );
      return updatedDoctor;
    } catch (error) {
      console.error("Error al reemplazar doctor:", error);
      throw error;
    }
  };

   getDoctorById = async (id) => {
    try {
      const doctor = await DoctorModel.findById(id); 
      return doctor;
    } catch (error) {
      console.error("Error buscando doctor por ID:", error);
      throw error;
    }
  };



}

export default Doctor;