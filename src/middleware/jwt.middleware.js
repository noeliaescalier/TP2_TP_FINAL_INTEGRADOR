import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

const generateToken = async (user) => {
  const payload = {
    sub: user?._id || user?.id,
    email: user?.email,
    role: user?.role,
  };

  const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

const validateToken = async (req, res, next) => {
  const tkn = req.headers.authorization;
  if (!tkn) {
    return res.status(401).json({ error: "No autorizado: token requerido" });
  }

  const splitBearer = tkn.split(" ")[1];
  if (!splitBearer) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  try {
    const validation = await jwt.verify(splitBearer, process.env.JWT_SECRET);
    req.user = validation;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};

export default {
  generateToken,
  validateToken,
};
