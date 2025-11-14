import express from "express";
import UsersController from "../controllers/Users.controller.js";

class UsersRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UsersController();
  }

  start() {
    this.router.get("/users", this.controller.getUsers);
    this.router.post("/users", this.controller.postUsers);

    return this.router;
  }
}

export default UsersRoutes;