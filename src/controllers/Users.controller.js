import UsersService from "../services/Users.service.js";

class UsersController {
  constructor() {
    this.service = new UsersService();
  }

getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json({
        status: 'success',
        data: users
      });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }  

  getNewPatientsStats = async (req, res) => {
    try {
      const count = await this.service.getNewPatientsToday();
      res.status(200).json({ 
        status: 'success',
        newPatientsToday: count
       });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  getTotalPatients = async (req, res) => {
    try {
      const count = await this.service.getTotalPatients();
      res.status(200).json({ 
        status: 'success',
        totalPatients: count
       });
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

 postUsers = async (req, res) => {
    try {
      const user = req.body;
      const data = await this.service.postUsers(user);
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

deleteUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteUsers(id);
      if (result) {
        res.status(200).json({ 
          status: 'success',
          message: 'User deleted successfully'
         });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: 'User not found'
         });
      }
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

 patchUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.service.patchUsers(id, userData);
      if (updatedUser) {
        res.status(200).json({
          status: 'success',
          data: updatedUser
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "User not found"
         });
      } 
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

 putUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.service.putUsers(id, userData);
      if (updatedUser) {
        res.status(200).json({
          status: 'success',
          data: updatedUser
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "User not found"
         });
      } 
    } catch (error) {
      res.status(500).json({ 
        status: 'error',
        message: error.message
       });
    }
  }

  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);
      if (user) {
        res.status(200).json({
          status: 'success',
          data: user
        });
      } else {
        res.status(404).json({ 
          status: 'error',
          message: "User not found"
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

export default UsersController;