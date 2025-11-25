import AuthService from "../services/Auth.service.js";

class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  register = async (req, res) => {
    try {
      const { user, token } = await this.service.register(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.service.login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({ error: error.message });
    }
  };
}

export default AuthController;
