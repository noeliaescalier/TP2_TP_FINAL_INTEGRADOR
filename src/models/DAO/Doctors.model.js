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

    postDoctors = async (doc) => {
        const doctor = new DoctorModel(doc)
        const data = await doctor.save()
        return data; 
  };

}

export default Doctor;