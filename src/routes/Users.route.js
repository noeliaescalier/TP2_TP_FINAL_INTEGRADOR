import express from "express";
import UsersController from "../controllers/Users.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class UsersRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new UsersController();
  }

  start() {
    this.router.get("/users", this.controller.getUsers);
    this.router.get("/users/stats/new", this.controller.getNewPatientsStats);
    this.router.get("/users/stats/total", this.controller.getTotalPatients);
    this.router.post("/users", validationMiddleware.validateRequiredFields(["email", "firstName", "lastName", "role", "dni"]), this.controller.postUsers);
    this.router.delete("/users/:id", validationMiddleware.validateId, this.controller.deleteUsers);
    this.router.patch("/users/:id", validationMiddleware.validateId, this.controller.patchUsers);
    this.router.put("/users/:id", validationMiddleware.validateId, this.controller.putUsers);
    this.router.get("/users/:id", validationMiddleware.validateId, this.controller.getUserById);

    return this.router;
  }
}

export default UsersRoutes;