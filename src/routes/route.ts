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
import { noURl } from "../controllers/errorController";
import { handleAsync } from "../utils/handleAsync";

export const router = express.Router();

router.get("/", validationRules, seed);

router.post("/signup", validationRules, handleAsync(signUpUser));

router.post("/login", handleAsync(loginUser));

router.get("/viewUser", middleware, verifyAdmin, handleAsync(viewUser));

router.post(
  "/addBook",
  middleware,
  upload.single("image"),
  bookValidationRules,
  handleAsync(addBook)
);

router.put("/updateBook", middleware, handleAsync(updateBook));

router.delete("/deleteBook", middleware, handleAsync(deleteBook));

router.all("*", noURl);

exports = { router };
