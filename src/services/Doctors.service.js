import DoctorsFactory from "../models/DAO/Dao.factory.clases.js"

class DoctorsService {
  constructor() {
    this.model = DoctorsFactory.create(process.env.PERSISTENCE);
  }

  getDoctors = async () => {
    const doctors = await this.model.getDoctors();
    return doctors;
  }

  postDoctors = async (doc) =>{
    const doctors = await this.model.postDoctors(doc);
    return doctors;
  }

}

export default DoctorsService;
