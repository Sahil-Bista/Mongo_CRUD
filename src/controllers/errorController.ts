import { Request,Response,NextFunction} from "express";
import CustomError from "../utils/CustomError";

export const globalErrorHandler = (error: CustomError, req:Request,res:Response ,next:NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status:error.statusCode,
        message : error.message
    });
}

export const noURl = (req:Request,res:Response, next:NextFunction) =>{
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
    next(err);
}
