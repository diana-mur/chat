import { Router } from "express";
import userController from "../controllers/userController.js";
import CheckRoleMiddleware from "../middleware/CheckRoleMiddleware.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const userRouter = new Router()

userRouter.post('/admin', CheckRoleMiddleware("ADMIN"), userController.deleteUser)
userRouter.get('/', userController.getUserList)
userRouter.post('/createChat', userController.createChat)
userRouter.post('/createCommunity', userController.createCommunity)
userRouter.post('/addUserInCommunity', userController.addUserInCommunity)

export default userRouter