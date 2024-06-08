const errorHandler = (err, req, res, next) => {
    if(err){
        res.status(err.output?.statusCode ?? 500).json(err);
    }
}
export default errorHandler;