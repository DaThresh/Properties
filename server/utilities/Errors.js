class Errors {
    response(response, error, code = 400){
        if(error instanceof Error) error = error.message;
        if(error instanceof Object && error.authorization) return this.responseAuth(response);
        response.status(code).json({
            message: 'error',
            error: error
        });
    }

    responseAuth(response){
        response.status(401).json({
            message: 'error',
            error: 'Unauthorized'
        });
    }

    error(error, message){
        Logger.error(message);
        console.error(error);
    }

    fatal(error, message){
        this.error(error, message);
        process.exit(0);
    }
}

module.exports = new Errors();