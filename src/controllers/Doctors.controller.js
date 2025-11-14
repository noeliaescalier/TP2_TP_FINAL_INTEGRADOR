import DoctorsService from "../services/Doctors.service.js";

class DoctorsController {
  constructor() {
    this.service = new DoctorsService();
  }

  getDoctors = async (req, res) => {
    const doctors = await this.service.getDoctors();
    res.send(doctors);
  }

    postDoctors = async (req, res) => {
    const doc = req.body;
    const data = await this.service.postDoctors(doc);
    res.send(data);
  }


}

export default DoctorsController;