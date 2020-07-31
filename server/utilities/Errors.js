class Errors {
    response(response, error){
        if(error instanceof Error) error = error.message;
        response.status(400).json({
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
        Errors.error(error, message);
        process.exit(0);
    }
}

module.exports = new Errors();