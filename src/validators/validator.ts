import express, { Request, Response } from "express";
import { error } from "console";
import { NextFunction } from "express";
import { body, validationResult } from "express-validator";

const validationRules = [
  body("username").trim().notEmpty().withMessage("Username is required"),

  body("pwd")
    .isLength({ min: 6 })
    .withMessage("password length must be 6 at minimum"),

  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Users musty be either an admin or a user."),
];

export {validationRules};
