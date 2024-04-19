import { Router } from "express";
import UserController from "../../controllers/userControllers";
import { Token, User } from "../../models";
import UserService from "../../services/UserServices";
import Paths from "../Paths";

const userService = new UserService(User, Token)

const userController = new UserController(userService)

const userRouter = Router();

userRouter.post('/register-init', userController.initiateRegistration)
userRouter.post('/', userController.completeRegistration)
userRouter.post('/login', userController.login)


export default userRouter