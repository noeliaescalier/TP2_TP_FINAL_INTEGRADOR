import UsersService from "../services/Users.service.js";

class UsersController {
  constructor() {
    this.service = new UsersService();
  }

getUsers = async (req, res) => {
    try {
      const users = await this.service.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }  

  getNewPatientsStats = async (req, res) => {
    try {
      const count = await this.service.getNewPatientsToday();
      res.status(200).json({ newPatients: count });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  getTotalPatients = async (req, res) => {
    try {
      const count = await this.service.getTotalPatients();
      res.status(200).json({ totalPatients: count });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

 postUsers = async (req, res) => {
    try {
      const user = req.body;
      const data = await this.service.postUsers(user);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

deleteUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.service.deleteUsers(id);
      if (result) {
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

 patchUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.service.patchUsers(id, userData);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      } 
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

 putUsers = async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const updatedUser = await this.service.putUsers(id, userData);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      } 
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}

export default UsersController;