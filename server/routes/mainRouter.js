import { Router } from "express";
import mainController from "../controllers/mainController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const mainRouter = new Router()

mainRouter.post('/registration', mainController.registration)
mainRouter.post('/login', mainController.login)
mainRouter.get('/auth', AuthMiddleware, mainController.check) // Авторизован пользователь или нет

export default mainRouter
