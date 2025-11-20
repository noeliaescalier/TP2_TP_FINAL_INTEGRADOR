import DoctorsService from "../services/Doctors.service.js";

class DoctorsController {
  constructor() {
    this.service = new DoctorsService();
  }

 getDoctors = async (req, res) => {
    try {
      const doctors = await this.service.getDoctors();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getDoctorsWithStats = async (req, res) => {
    try {
      const doctors = await this.service.getDoctorsWithStats();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  postDoctors = async (req, res) => {
    try {
      const doc = req.body;
      const data = await this.service.postDoctors(doc);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  deleteDoctors = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteDoctors(id);
      if (result) {
        res.status(200).json({ message: "Doctor eliminado correctamente" });
      } else {
        res.status(404).json({ message: "Doctor no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
  
  patchDoctors = async (req, res) => {
    try {
      const { id } = req.params;
      const docData = req.body;
      const updatedDoc = await this.service.patchDoctors(id, docData);
      if (updatedDoc) {
        res.status(200).json(updatedDoc);
      } else {
        res.status(404).json({ message: "Doctor no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  putDoctors = async (req, res) => {  
    try {
      const { id } = req.params;
      const docData = req.body;
      const updatedDoc = await this.service.putDoctors(id, docData);
      if (updatedDoc) {
        res.status(200).json(updatedDoc);
      } else {
        res.status(404).json({ message: "Doctor no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getDoctorById = async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await this.service.getDoctorById(id);
      if (doctor) {
        res.status(200).json(doctor);
      } else {
        res.status(404).json({ message: "Doctor no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

}

export default DoctorsController;