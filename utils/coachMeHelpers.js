class Helpers {
    /***
     * catchError gracefully sends error responses from express endpoints to the client
     * @param {Object} res - Express 'res' (response) object
     * @param {Object} error - Error object to return in response. If error has status and/or message attributes these will passed in the response. 
     */
    catchError(res, error){
        return res.status(error.status ? error.status : 500).json({
            message: error.message ? error.message : "There was an internal server error."
        });
    }
}

module.exports = new Helpers();