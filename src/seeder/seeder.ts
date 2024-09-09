import express, { Request, Response } from "express";
import { User } from "../models/usermodel";
import fs from "fs";
import bcrypt from "bcrypt";

const seed = async (req: Request, res: Response) => {
  try {
    const numberofUsers = await User.countDocuments();
    if (numberofUsers == 0) {
      const content = fs.readFileSync("./src/seeder/seed.json", "utf-8");
      let parsedContent = JSON.parse(content);
      const salt_rounds = 10;
      for (const item of parsedContent) {
        try {
          await User.create({
            username: item.username,
            password: await bcrypt.hash(item.pwd, salt_rounds),
            role: item.role,
          });
        } catch (err: any) {
          res.send(err.message);
        }
      }
    }
  } catch (err: any) {
    console.log(err.message);
  }
  res.send("welcome to the app");
};

export { seed };
