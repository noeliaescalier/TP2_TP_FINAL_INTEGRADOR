import express from "express";
import AuthController from "../controllers/Auth.controller.js";
import validationMiddleware from "../middleware/validation.middleware.js";

class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.controller = new AuthController();
  }

  start() {
    this.router.post(
      "/auth/register",
      validationMiddleware.validateRequiredFields([
        "email",
        "password",
        "firstName",
        "lastName",
        "role"
      ]),
      this.controller.register
    );

    this.router.post(
      "/auth/login",
      validationMiddleware.validateRequiredFields(["email", "password"]),
      this.controller.login
    );

    return this.router;
  }
}

export default AuthRoutes;
