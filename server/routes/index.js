import { Router } from "express";
import userRouter from "./userRouter.js";
import mainRouter from "./mainRouter.js";

const router = new Router()

router.use('/user', userRouter)
router.use('/', mainRouter)

export default router