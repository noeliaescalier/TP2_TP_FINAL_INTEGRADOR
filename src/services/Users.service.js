import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class UsersService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("User", persistence);
  }

  getUsers = async () => {
    const users = await this.model.getUsers();
    return users;
  }

  getNewPatientsToday = async () => {
    
    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(); end.setHours(23,59,59,999);
      
    const patientsToday = this.model.getNewPatients(start, end);
    return patientsToday;
  }

  getTotalPatients = async () => {
    const patients = await this.model.getTotalPatients();
    return patients;
  }

   postUsers = async (user) => {
    const created = await this.model.postUser(user);
    return created;
  }

  deleteUsers = async (id) => {
    const result = await this.model.deleteUser(id);
    return result;
  }

  patchUsers = async (id, userData) => {
    const updated = await this.model.patchUser(id, userData);
    return updated;
  }

  putUsers = async (id, userData) => {
    const updated = await this.model.putUser(id, userData);
    return updated;
  }

  getUserByEmail = async (email) => {
    const user = await this.model.getUserByEmail(email);
    return user;
  }
}

export default UsersService;
