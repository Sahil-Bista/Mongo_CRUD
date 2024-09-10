import { Request, Response, NextFunction } from "express";

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export function handleAsync(requestHandler: AsyncRouteHandler) {
  return async function asycnWrapper(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await requestHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
