class CustomError extends Error{
    public statusCode: number;
    public status: string;
    public isOperational: boolean;

    constructor(message: string,statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.isOperational = true;//Operational errors that might occur
        Error.captureStackTrace(this,this.constructor);
        //It helps in tracking the sequence of function calls that led to the creation of an error.
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export default CustomError;