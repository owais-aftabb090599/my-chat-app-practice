class ThrowError extends Error {
    constructor(messsage, statusCode, success) {
        super(messsage);
        this.statusCode = statusCode;
        this.success = success
    }
}

const errorHandler = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    err.success = err.success || false;
    return res.status(err.statusCode).json({
        success: err.success,
        status: err.status,
        message: err.message
    });
}

module.exports = {
    ThrowError,
    errorHandler
}