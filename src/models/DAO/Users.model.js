import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["PACIENTE", "MEDICO", "ADMIN"],
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  dni: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const UserModel = mongoose.model("UserModel", userSchema);

class User  {
  constructor() {
    this.collection = "users";
  }

  getUsers = async () => {
    try {
      return await UserModel.find();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  };

  getNewPatients = async (start, end) => {
    try {
      const count = await UserModel.countDocuments({
        role: "PACIENTE",
        createdAt: { $gte: start, $lte: end } 
      });
      return count;
    } catch (error) {
      console.error("Error contando pacientes nuevos:", error);
      throw error;
    }
  };

  getTotalPatients = async () => {
    try {
      return await UserModel.countDocuments({ role: "PACIENTE" });
    } catch (error) {
      console.error("Error al contar total de pacientes:", error);
      throw error;
    }
  };

  postUser = async (userData) => {
    try {
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.passwordHash = await bcrypt.hash(userData.password, salt);
        delete userData.password;
      }

      const newUser = new UserModel(userData);
      return await newUser.save();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  };

  deleteUser = async (id) => {
    try {
      const result = await UserModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      throw error;
    }
  };

  patchUser = async (id, userData) => {
    try {
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.passwordHash = await bcrypt.hash(userData.password, salt);
        delete userData.password;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { $set: userData },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  };

  putUser = async (id, userData) => {
    try {
      if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.passwordHash = await bcrypt.hash(userData.password, salt);
        delete userData.password;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(      
        id,
        { $set: userData },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.error("Error al reemplazar usuario:", error);
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.error("Error buscando usuario por ID:", error);
      return null;
    }
  };

  getUserByEmail = async (email) => {
    try {
        return await UserModel.findOne({ email });
    } catch (error) {
        console.error("Error buscando usuario por Email:", error);
        return null;
    }
  };

 
}

export { UserModel };
export default User;