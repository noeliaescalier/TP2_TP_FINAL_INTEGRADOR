import UsersService from "../services/Users.service.js";

class UsersController {
  constructor() {
    this.service = new UsersService();
  }

  getUsers = async (req, res) => {
    const users = await this.service.getUsers();
    res.send(users);
  }

  postUsers = async (req, res) => {
    const user = req.body;
    const data = await this.service.postUsers(user);
    res.send(data);
  }
}

export default UsersController;