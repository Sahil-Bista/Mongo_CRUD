import { Request, Response, NextFunction } from "express";
import { User } from "../models/usermodel";
import { jwtDecode } from "jwt-decode";

async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const token: any = req.headers.authorization;
  const decoded_token: { username: String; id: String; iat: Date } =
    jwtDecode(token);
  let user_id: String = decoded_token.id;
  const user = await User.findById(user_id);
  if (user?.role !== "admin") {
    return res
      .status(401)
      .json({
        message: "Access denied. You need an Admin role to get access.",
      });
  }
  next();
}

export { verifyAdmin };
