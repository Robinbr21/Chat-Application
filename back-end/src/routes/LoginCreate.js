import { Router } from "express";

import controller from "../controllers/index"

const router = Router()
router.post("/",controller.loginController.login)
router.post("/create",controller.loginController.create)

export default router