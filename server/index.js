import express from "express";
import WebSocket, { WebSocketServer } from "ws";
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

        const server = app.listen(5000, () => console.log('Сервер HTTP стартовал на порту номер 5000'))

        const wss = new WebSocketServer({server})
        // const wss = new WebSocket.Server({server})

        process.on("message", (message) => {
            console.log(message);
        });

        wss.on("test", (socket) => {
            socket.send()
        })

        wss.on('connection', function connection(ws) {
            console.log('123');
            ws.on('message', function (message) {
                // парсинг из json-объекта в объект JS
                message = JSON.parse(message);

                switch (message.event) {
                    case 'connection':
                        broadcastMessage(message)
                        break;
                    case 'message':
                        broadcastMessage(message)
                        break;
                }
            })
        })

        function broadcastMessage(message) {
            wss.clients.forEach((client) => {
                client.send(JSON.stringify(message))
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const match = false

if (match) {

    const wss = new WebSocketServer({
        port: 5000,
    }, () => console.log(`Сервер WebSocket стартовал на порту номер 5000`))

    wss.on('connection', function connection(ws) {
        ws.on('message', function (message) {
            // парсинг из json-объекта в объект JS
            message = JSON.parse(message);

            switch (message.event) {
                case 'connection':
                    broadcastMessage(message)
                    break;
                case 'message':
                    broadcastMessage(message)
                    break;
            }
        })
    })

    function broadcastMessage(message) {
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(message))
        })
    }
}

start()

app.use(errorHandler) // обязательно должно быть в конце!