import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
import jwt from "jsonwebtoken";
import { User } from "../models/usermodel";
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";



const viewUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, "username");
    res.send(users);
  } catch (err: any) {
    res.send(err.message);
  }
};

const signUpUser = async (req: Request, res: Response) => {
  const { username, pwd, role } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pwd,saltRounds);
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  if (!username || !pwd) {
    return res.status(400).send("Username and password required");
  }
  const existingUser = await User.findOne({username});
  if(existingUser){
    return res.status(400).json({ error: 'Username already in use' });
  }
  try {
    await User.create({
      username: username,
      password: hashedPassword,
      role: role,
    });
  } catch (err: any) {
    console.log(err.message);
    res.send("Some wrror with db");
  }
  res.send("user signed up");
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, pwd }  = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
    if (!username || !pwd) {
      return res.status(400).send("Username and password required");
    }
    const user  = await User.findOne({ username: username });
    if (!user) {
      return res.send("user unavailable");
    }
      const isPasswordValid = bcrypt.compare(pwd, user.password);
      if (!isPasswordValid) {
        return res.status(401).send("invalid credentials");
      }  
    const payload = {
      username: username,
      id: user.id,
    };
    const secret_key = "BigBigSecret";
    if (!secret_key) {
      return res.status(500).send("Secret key not configured");
    }
    const token = jwt.sign(payload, secret_key);
    res.send(token);
  } catch (err: any) {
    console.log(err.message);
    res.send("User could not be logged in");
  }
};

export { signUpUser, loginUser, viewUser };
