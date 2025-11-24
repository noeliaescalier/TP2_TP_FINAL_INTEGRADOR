import bcrypt from "bcrypt";
import DaoFactory from "../models/DAO/Dao.factory.clases.js";
import jwtMiddleware from "../middleware/jwt.middleware.js";

class AuthService {
  constructor(persistence = process.env.PERSISTENCE) {
    this.userModel = DaoFactory.get("User", persistence);
  }

  sanitizeUser(user) {
    if (!user) return null;
    const { passwordHash, __v, ...rest } = user.toObject ? user.toObject() : { ...user };
    return rest;
  }

  register = async (payload) => {
    const { email, password, role, firstName, lastName, dni, phone } = payload;

    const existing = await this.userModel.getUserByEmail(email);
    if (existing) {
      const error = new Error("El email ya está registrado");
      error.statusCode = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const created = await this.userModel.postUser({
      email,
      passwordHash,
      role,
      firstName,
      lastName,
      dni,
      phone
    });

    const sanitized = this.sanitizeUser(created);
    const token = await jwtMiddleware.generateToken({
      _id: sanitized._id,
      email: sanitized.email,
      role: sanitized.role
    });

    return { user: sanitized, token };
  };

  login = async (email, password) => {
    const user = await this.userModel.getUserByEmail(email);
    if (!user) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      const error = new Error("Credenciales inválidas");
      error.statusCode = 401;
      throw error;
    }

    const sanitized = this.sanitizeUser(user);
    const token = await jwtMiddleware.generateToken({
      _id: sanitized._id,
      email: sanitized.email,
      role: sanitized.role
    });

    return { user: sanitized, token };
  };
}

export default AuthService;
