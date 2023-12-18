import jwt from "jsonwebtoken"

// Проверка на то, авторизован ли пользователь
export default function AuthMiddleware(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Пользователь не авторизован" })
        }
        const token = authorizationHeader.split(' ')[1]
        if (!token) {
            return res.status(401).json({ message: "Пользователь не авторизован" })
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // в поле user добавили данные, которые вытащили из токена 
        // и во всех функциях этот user будет доступен
        req.user = decoded
        next() // вызов следующего в цепочке middleware
    } catch (error) {
        res.status(401).json({ message: "Пользователь не авторизован" })
    }
}