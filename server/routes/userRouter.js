import { Router } from "express";
import userController from "../controllers/userController.js";
import CheckRoleMiddleware from "../middleware/CheckRoleMiddleware.js";
import UserId from "../middleware/UserId.js";

const userRouter = new Router()

userRouter.post('/admin', CheckRoleMiddleware("ADMIN"), userController.deleteUser)
userRouter.get('/userList', UserId, userController.userList)
userRouter.get('/chatList', UserId, userController.chatList)
userRouter.post('/createChat', UserId, userController.createChat)
userRouter.post('/createCommunity', UserId, userController.createCommunity)
userRouter.post('/addUserInCommunity', UserId, userController.addUserInCommunity)
userRouter.post('/sendMessage', UserId, userController.sendMessage)
userRouter.post('/messageHistory', UserId, userController.messageHistory)

export default userRouter