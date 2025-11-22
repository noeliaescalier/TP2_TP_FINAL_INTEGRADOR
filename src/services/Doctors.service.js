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
    const doctors = await this.model.postDoctors(doc);
    return doctors;
  }

  deleteDoctors = async (id) => {
    const result = await this.model.deleteDoctors(id);
    return result;
  }

  patchDoctors = async (id, docData) => {
    const updatedDoc = await this.model.patchDoctors(id, docData);
    return updatedDoc;
  }

  putDoctors = async (id, docData) => {
    const updatedDoc = await this.model.putDoctors(id, docData);
    return updatedDoc;
  }

    getDoctorById = async (id) => {
    const doctor = await this.model.getDoctorById(id);

    if (!doctor) {
      throw new Error("Doctor no encontrado");
    }

    return doctor;
  };

}

export default DoctorsService;
