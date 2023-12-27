import jwt from "jsonwebtoken";

// id user
export default function UserId(req, res, next) {
    const authorizationHeader = req.headers.authorization
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // в поле user добавили данные, которые вытащили из токена 
        // и во всех функциях этот user будет доступен
        req.user = decoded
    }
    next()
}