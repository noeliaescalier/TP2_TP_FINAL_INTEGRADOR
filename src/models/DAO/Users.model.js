import mongoose from "mongoose";

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

  getUser = async () => {
    try {
      return await UserModel.find();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  };

    postUser = async (us) => {
        const user = new UserModel(us)
        const data = await user.save()
        return data; 
  };

}

export default User;