import jwt from "jsonwebtoken"

export default function CheckRoleMiddleware(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: "Пользователь не авторизован" })
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                res.status(403).json({ message: "Нет доступа" })
            }
            // в поле user добавили данные, которые вытащили из токена 
            // и во всех функциях этот user будет доступен
            req.user = decoded
            next() // вызов следующего в цепочке middleware
        } catch (error) {
            res.status(401).json({ message: "Пользователь не авторизован" })
        }
    }
}