import { Router } from "express";
import v1Router from "./v1";

const router = Router()
router.use(v1Router)

export default router