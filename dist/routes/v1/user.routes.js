"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../../controllers/userControllers"));
const models_1 = require("../../models");
const UserServices_1 = __importDefault(require("../../services/UserServices"));
const userService = new UserServices_1.default(models_1.User, models_1.Token);
const userController = new userControllers_1.default(userService);
const userRouter = (0, express_1.Router)();
userRouter.post('/register-init', userController.initiateRegistration);
userRouter.post('/', userController.completeRegistration);
userRouter.post('/login', userController.login);
exports.default = userRouter;
