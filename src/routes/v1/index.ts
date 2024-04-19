import { Router } from "express";
import userRouter from "./user.routes";

const v1Router = Router()
const ROOT = '/v1/users'

v1Router.use(ROOT, userRouter)

export default v1Router