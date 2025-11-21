import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY

//no cambiar el generateToken a async ya que jwt.sign no devuelve una promesa
const generateToken = (data) => {
    const payload = {
        user: data.user,
        role: data.role
    };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
    return token;
}

const validateToken = async (req, res, next) => {
   const tokenHeader = req.headers.authorization;

   if (!tokenHeader) {
       return  res.status(401).json({
            status: 'error',
            message: 'No token provided'
        });
    }

    const splitBearer = tokenHeader.split(' ');

   if (splitBearer.length !==2 || splitBearer[0] !== 'Bearer') {
       return res.status(401).json({
              status: 'error',
                message: 'Invalid token format'
         });
    }

    const token = splitBearer[1];

    try {
        const decoded = await jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid or expired token'
        });
    }

};

export default {
    generateToken,
    validateToken
};
    