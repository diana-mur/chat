import models from "../models/models.js";
import ApiError from "../error/ApiError.js"
import sequelize from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = models.User;
const Chat = models.Chat;
const Chat_settings = models.Chat_settings;
const Message = models.Message;

class UserController {
    // Удаление аккаунта пользователя АДМИНИСТРАТОРОМ
    async deleteUser(req, res) {
        const { id, email } = req.body
        const searchUser = await User.findOne({ where: { id, email } })
        if (searchUser) {
            const deleteUser = await User.drop({ where: { id, email } })
            res.json({ deleteUser })
        }
        res.json({ message: "Данные введены некорректно" })
    }

    // Получение списка аккаунтов 
    // и Списка чатов для определённого пользователя
    // Вывод последнего сообщения в истории диалога с именем автора
    // убрала await в двух местах
    async getUserList(req, res) {
        // id получили из расшифрованного токена, т.к. его занесли в переменную user
        const { id } = req.user // ID пользователя
        const listUsers = await User.findAll()
        const listChat_settings = await Chat_settings.findAll({ where: { userId: id } })
        let ARRAY_listChats = []
        for (let i = 0; i < listChat_settings.length; i++) {
            const listChats = Chat.findOne({ where: { id: listChat_settings[i].chatId } })
            const lastMessage = Message.findAll({ limit: 1, where: { chatId: listChat_settings[i].chatId }, order: [["createdAt", "DESC"]] })
            ARRAY_listChats.push({ author: listChats, lastmess: lastMessage })
        }
        res.json({ listUsers, ARRAY_listChats })
    }

    // создание личного чата
    async createChat(req, res) {
        const { chat_name, user_id } = req.body
        const { id } = req.user
        const checkUniqueId = await Chat_settings.findAll({ where: { userId: id } })
        const checkUniqueUser_id = await Chat_settings.findAll({ where: { userId: user_id } })

        for (let i = 0;
            i < (checkUniqueId.length >= checkUniqueUser_id.length ? checkUniqueId.length : checkUniqueUser_id.length); // возвращается длина большего массива
            i++) {
            for (let n = 0;
                n < (checkUniqueId.length < checkUniqueUser_id.length ? checkUniqueId.length : checkUniqueUser_id.length); // возвращается длина меньшего массива
                n++) {
                if (checkUniqueId[i].chatId == checkUniqueUser_id[n].chatId) {
                    const checkUnique = await Chat.findOne({ where: { id: checkUniqueId[i].chatId } })
                    if (checkUnique.type === "CHAT") {
                        return res.json({ message: `Чат уже существует с id ${checkUnique.id}` })
                    }
                }
            }
        }

        const chat = await Chat.create({ chat_name: chat_name, type: "CHAT" });
        const chat_settings1 = await Chat_settings.create({ chatId: chat.id, userId: id })
        const chat_settings2 = await Chat_settings.create({ chatId: chat.id, userId: user_id })
        return res.json({ chat, chat_settings1, chat_settings2 })
    }

    // создание беседы пользователем
    async createCommunity(req, res) {
        const { chat_name, user1_id, USERS } = req.body
        const { id } = req.user
        const community = await Chat.create({ chat_name: chat_name, type: "COMMUNITY" })
        const community_settings1 = await Chat_settings.create({ chatId: community.id, userId: id })
        const community_settings2 = await Chat_settings.create({ chatId: community.id, userId: user1_id })

        let community_settings = {} // создание объекта community_settings
        let ARRAY_community_settings = [] // создание массива ARRAY_community_settings для сохранения результатов функций
        for (let i = 0; i < USERS.length; ++i) { // запуск цикла for
            let dynamic_key = `community_settings${i + 3}` // переменная с текстом - названием функции
            community_settings[dynamic_key] = await Chat_settings.create({ chatId: community.id, userId: USERS[i].user_id })
            ARRAY_community_settings.push(community_settings[dynamic_key])
        }

        return res.json({ community, community_settings1, community_settings2, ARRAY_community_settings })
    }

    // Добавление новых участников в беседы
    async addUserInCommunity(req, res) {
        const { chat_id, USERS } = req.body
        // id беседы (чата) и массив с user_id добавляемых пользователей
        if (!USERS || !Array.isArray(USERS)) {
            return res.status(400).json({ message: chat_id });
        }

        let add_user = {}
        let ARRAY_chat_settings = []
        for (let i = 0; i < USERS.length; i++) {
            const checkUniqueId = await Chat_settings.findAll({ where: { chatId: chat_id, userId: USERS[i].user_id } })
            if (!checkUniqueId) {
                let dynamic_key = `add_user${i + 1}`
                add_user[dynamic_key] = await Chat_settings.create({ chatId: chat_id, userId: USERS[i].user_id })
                ARRAY_chat_settings.push(add_user[dynamic_key])
            }
            ARRAY_chat_settings.push({ message: "пользователь уже является участником" })
        }

        return res.json({ ARRAY_chat_settings })
    }

    // Удаление чатов / бесед ДОДЕЛАТЬ
    async deleteChat(req, res) {
        const { chat_id } = req.body
        const { id } = req.user
        const security_Chat_settings = await Chat_settings.findOne({ userId: id, chatId: chat_id })
        if (!security_Chat_settings) {
            return res.json({message: "Данные введены некорректно"})
        }
        const security_Chat = await Chat.findOne({})
        if (security) {
            const deleteChat = await Chat.drop({ where: { id: chat_id } })
        }




    }
}

export default new UserController()