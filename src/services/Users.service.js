import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class UsersService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("User", persistence);
  }

  getUsers = async () => {
    const users = await this.model.getUser();
    return users;
  }

  getNewPatientsToday = async () => {
    
    const start = new Date(); start.setHours(0,0,0,0);
    const end = new Date(); end.setHours(23,59,59,999);
      
    return await this.model.getNewPatients(start, end);
  }

 

  postUsers = async (user) => {
    const created = await this.model.postUser(user);
    return created;
  }
}

export default UsersService;