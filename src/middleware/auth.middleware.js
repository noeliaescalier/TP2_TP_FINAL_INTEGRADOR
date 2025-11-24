import jwtMiddleware from "./jwt.middleware.js";

const requireAuth = (req, res, next) => {
  return jwtMiddleware.validateToken(req, res, next);
};

const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Permiso denegado" });
    }

    next();
  };
};

export default {
  requireAuth,
  requireRole,
};
