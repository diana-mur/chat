import { Router } from "express";
import mainController from "../controllers/mainController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";
import UserId from "../middleware/UserId.js";

const mainRouter = new Router()

mainRouter.post('/registration', mainController.registration)
mainRouter.post('/login', mainController.login)
mainRouter.get('/auth', AuthMiddleware, mainController.check) // Авторизован пользователь или нет
mainRouter.get('/userId', UserId, mainController.userId) // Получение id пользователя
mainRouter.get('/myUsername', UserId, mainController.myUsername)

export default mainRouter
