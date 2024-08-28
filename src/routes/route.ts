import express, { Request, Response } from "express";
import { middleware } from "../middleware/auth";
import { signUpUser, loginUser, viewUser } from "../controllers/usercontroller";
import {
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/bookscontroller";
import { upload } from "../middleware/fileupload";
import { verifyAdmin } from "../middleware/adminvalidation";
import { validationRules } from "../validators/validator";
import { seed } from "../seeder/seeder";
import { bookValidationRules } from "../validators/bookvalidator";

export const router = express.Router();

router.get("/",validationRules,seed);

router.post("/signup", validationRules, signUpUser);

router.post("/login", loginUser);

router.get("/viewUser", middleware, verifyAdmin, viewUser);

router.post("/addBook", middleware, upload.single("image"), bookValidationRules,addBook);

router.put("/updateBook", middleware, updateBook);

router.delete("/deleteBook", middleware, deleteBook);

exports = { router };
