const errorHandler = (error, req, res, next) => {
    console.error(error.stack);

    res.status(500).json({
        status: "error",
        message: "Ocorreu um erro inesperado no servidor."
    });
};

module.exports = errorHandler;