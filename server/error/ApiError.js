class ApiError extends Error {
    constructor(status, message) {
        super(); // вызов родительского класса
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    // нет доступа
    static forbidden(message) {
        return new ApiError(403, message)
    }
}

export default ApiError