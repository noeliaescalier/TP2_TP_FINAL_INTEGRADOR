import UserDAO from '../models/DAO/Users.model.js'; 
import bcrypt from 'bcrypt';

const userService = new UserDAO();


const loginUser = async (email, passwordIngresada) => {
   
    const user = await userService.getUserByEmail(email);
    
    if (!user) return null; 
    
    const isPasswordValid = await bcrypt.compare(passwordIngresada, user.passwordHash);

    if (!isPasswordValid) return null; 

    return user;
}

export default { loginUser };