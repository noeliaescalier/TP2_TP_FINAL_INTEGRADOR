import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class DoctorsService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("Doctor", persistence);
  }

  getDoctors = async () => {
    const doctors = await this.model.getDoctors();
    return doctors;
  }

  getDoctorsWithStats = async () => {
    const doctors = await this.model.getDoctorsWithStats();
    return doctors;
  }

  postDoctors = async (doc) => {
    const doctor = await this.model.postDoctor(doc);
    return doctor;
  }

  deleteDoctors = async (id) => {
    const result = await this.model.deleteDoctor(id);
    return result;
  }

  patchDoctors = async (id, docData) => {
    const updatedDoc = await this.model.patchDoctor(id, docData);
    return updatedDoc;
  }

  putDoctors = async (id, docData) => {
    const updatedDoc = await this.model.putDoctor(id, docData);
    return updatedDoc;
  }
}

export default DoctorsService;
