function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found', req.originalUrl);
    next(error);
}

function errorHandler(error, req, res, next) {
    if (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    notFound,
    errorHandler
}