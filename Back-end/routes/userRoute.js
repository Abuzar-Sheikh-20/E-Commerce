import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);  // POST method for registration
userRouter.post('/login', loginUser);        // POST method for login
userRouter.post('/admin', adminLogin);       // POST method for admin login

export default userRouter;