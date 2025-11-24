import DoctorsService from "../services/Doctors.service.js";

class DoctorsController {
  constructor() {
    this.service = new DoctorsService();
  }

 getDoctors = async (req, res) => {
    try {
      const doctors = await this.service.getDoctors();
      res.status(200).json({
        status: 'success',
        data: doctors
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  getDoctorsWithStats = async (req, res) => {
    try {
      const doctors = await this.service.getDoctorsWithStats();
      res.status(200).json({
        status: 'success',
        data: doctors
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  postDoctors = async (req, res) => {
    try {
      const doc = req.body;
      const data = await this.service.postDoctors(doc);
      res.status(201).json({
        status: 'success',
        data: data
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }

  deleteDoctors = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteDoctors(id);
      if (result) {
        res.status(200).json({ 
          status: 'success',
          message: 'Doctor deleted successfully' 
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: 'Doctor not found'
         });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message 
      });
    }
  }
  
  patchDoctors = async (req, res) => {
    try {
      const { id } = req.params;
      const docData = req.body;
      const updatedDoc = await this.service.patchDoctors(id, docData);
      if (updatedDoc) {
        res.status(200).json({
          status: 'success',
          data: updatedDoc
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "Doctor no found"
         });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  putDoctors = async (req, res) => {  
    try {
      const { id } = req.params;
      const docData = req.body;
      const updatedDoc = await this.service.putDoctors(id, docData);
      if (updatedDoc) {
        res.status(200).json({
          status: 'success',
          data: updatedDoc
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "Doctor no found"
         });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  getDoctorById = async (req, res) => {
    try {
      const { id } = req.params;
      const doctor = await this.service.getDoctorById(id);
      if (doctor) {
        res.status(200).json({
          status: 'success',
          data: doctor
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "Doctor no found"
         });
      }
    } catch (error) {
      res.status(500).send({ 
        status: 'error',
        message: error.message
      });
    }
  }

}

export default DoctorsController;