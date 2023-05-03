import { Router } from "express";
import { loggerTestController } from "../controllers/loggerTest.controller.js";

const router = Router()


router.get('/', 
loggerTestController

)

export default router