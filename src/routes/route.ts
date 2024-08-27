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

export const router = express.Router();

router.post("/signup", signUpUser);

router.post("/login", loginUser);

router.get("/viewUser", middleware, verifyAdmin, viewUser);

router.post("/addBook", middleware, upload.single("image"), addBook);

router.put("/updateBook", middleware, updateBook);

router.delete("/deleteBook", middleware, deleteBook);

exports = { router };
