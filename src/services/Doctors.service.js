import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class DoctorsService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("Doctor", persistence);
  }

  getDoctors = async () => {
    const doctors = await this.model.getDoctors();
    return doctors;
  }

  postDoctors = async (doc) => {
    const doctors = await this.model.postDoctors(doc);
    return doctors;
  }
}

export default DoctorsService;
