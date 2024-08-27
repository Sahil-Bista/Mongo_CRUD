import express, { Request, Response } from 'express';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const authorization: any = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send("Token not found");
    }
    const token = authorization.split(" ");
    if (token.length !== 2 || token[0] !== "Bearer") {
        return res.status(401).send("Bearer token not present");
    }
    const decoded_token = token[1];
    const secret_key = "BigBigSecret";
    try {
        const data = jwt.verify(decoded_token, secret_key);
        next();
    } catch (error: any) {
        console.log(error.message);
        return res.status(401).send("Invalid token");
    }
   

}

// export {middleware};

