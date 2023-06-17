import { Router } from "express";
import controllers from "../controllers/ChatController";

const router = Router()

router.get('/', controllers.index);
router.post('/getMessages', controllers.getMessages);
router.post('/groupCreate', controllers.groupCreate);
export default router
