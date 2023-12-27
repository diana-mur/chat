import { config } from 'dotenv';
config();

import models from "../models/models.js";
import ApiError from "../error/ApiError.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const User = models.User;
const Chat = models.Chat;
const Chat_settings = models.Chat_settings;
const Message = models.Message;

const generateJWT = (id, name, email, role) => {
    return jwt.sign(
        { id, name, email, role }, // содержит
        process.env.SECRET_KEY, // ключ шифрования
        { expiresIn: '24h' } // время действия
    )
}

class MainController {
    // Регистрация
    async registration(req, res, next) {
        const { name, email, pass, role } = req.body

        if (!email || !pass) {
            return next(ApiError.badRequest("Некорректные данные"))
        }

        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }

        const hashPassword = await bcrypt.hash(pass, 5)
        const user = await User.create({ name, email, role, pass: hashPassword })
        const token = generateJWT(user.id, user.email, user.name, user.role)

        return res.json({ token })
    }

    // Авторизация
    async login(req, res, next) {
        const { email, pass } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"))
        }

        // Проверка правильности пароля - сравнение введённого пароля и пароля с БД
        let comparePassword = bcrypt.compareSync(pass, user.pass)
        if (!comparePassword) {
            return next(ApiError.internal("Указан неверный пароль"))
        }

        const token = generateJWT(user.id, user.email, user.name, user.role)

        res.json({ token })
    }

    // Проверка вошел ли пользователь в систему
    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.name, req.user.role)
        res.json({ token })
    }

    async userId(req, res, next) {
        const { id } = req.user;
        res.json({ id })
    }

    async myUsername(req, res) {
        const { name } = req.user;
        res.json({ name })
    }
}

export default new MainController()