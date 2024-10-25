//Handle cases where a requested route or resource is not found
const notFound = (req, res, next) => {
    const error = new Error(`Not Found : ${req.originalUrl}`); //takes the original URL if not found
    res.status(404);
    next(error);
};

//Handle errors that occur during the processing of a request.

const errorHandler = (err, req,res,next) => {
    const statuscode=res.statuscode == 200?500 :res.statusCode;
    res.status(statuscode);
    res.json({
        message:err?.message,
        stack:err?.stack,
    });
};
module.exports = {errorHandler, notFound};