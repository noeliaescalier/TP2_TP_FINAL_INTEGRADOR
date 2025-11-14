import DaoFactory from "../models/DAO/Dao.factory.clases.js";

class UsersService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.model = DaoFactory.get("User", persistence);
  }

  getUsers = async () => {
    const users = await this.model.getUser();
    return users;
  }

  postUsers = async (user) => {
    const created = await this.model.postUser(user);
    return created;
  }
}

export default UsersService;