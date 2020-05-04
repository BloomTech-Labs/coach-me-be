class Helpers {
    catchError(res, error){
        return res.status(error.status ? error.status : 500).json({
            message: error.message ? error.message : "There was an internal server error."
        });
    }
}

module.exports = new Helpers();