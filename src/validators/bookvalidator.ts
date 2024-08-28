
import { body } from "express-validator";


const bookValidationRules = [
  body("bookname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("bookname is required"),

  body("book_author")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Book_athor's name is required")
];

export {bookValidationRules};
  

