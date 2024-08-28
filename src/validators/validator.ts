
import { body } from "express-validator";



const validationRules = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username is required"),

  body("pwd")
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage("password length must be 6 at minimum"),

  body("role")
    .optional()
    .isIn(["admin", "user"])
    .withMessage("Users musty be either an admin or a user."),
];

export {validationRules};
  

