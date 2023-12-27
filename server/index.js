import express, { json } from "express";
import { WebSocketServer } from "ws";
import sequelize from "./db.js";
import models from "./models/models.js";
import cors from "cors"
import router from "./routes/index.js";
import errorHandler from "./middleware/ErrorHandlingMiddleware.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate() // аутентификация пользователя
        await sequelize.sync() // сверка состояния бд со схемой данных в models

        const server = app.listen(5000, () => console.log('Сервер стартовал на порту номер 5000'))

        const wss = new WebSocketServer({ server })

        wss.on('connection', function connection(ws) {
            ws.on('message', function (message) {
                const parsedMessage = JSON.parse(message)
                let idRoom
                switch (parsedMessage.event) {
                    case 'connection':
                        idRoom = parsedMessage.idRoom;
                        ws.id = idRoom;
                        const messageHistory = models.Message.findAll({ where: { chatId: idRoom }, order: [['createdAt']] })
                        messageHistory.then(messages => {
                            wss.clients.forEach((client) => {
                                if (client.id == idRoom) {
                                    messages.map(({ id, content, createdAt, userId }) => {
                                        client.send(
                                            JSON.stringify(
                                                { event: 'history', id, content, createdAt, userId }
                                            )
                                        )
                                    })
                                }
                            })
                        })
                        console.log(`Подключение установлено ${idRoom}`);
                        break;
                    case 'message':
                        // отправка сообщений в бд
                        const { id, chat_id, content } = parsedMessage
                        const newMessage = models.Message.create({ userId: id, chatId: chat_id, content: content })
                        newMessage.then(message => {
                            wss.clients.forEach((client) => {
                                if (client.id == idRoom) {
                                    client.send(JSON.stringify({ event: 'message', content: message.content, createdAt: message.createdAt, userId: id }))
                                }
                            })
                        })
                        break;
                }
            })
        })

    } catch (error) {
        console.log(error);
    }
}

start()

app.use(errorHandler) // обязательно должно быть в конце!