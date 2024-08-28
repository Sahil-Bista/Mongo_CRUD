import express, { Request, Response, Router } from "express";
const app = express();
const port: number = 3000;
app.use(express.json());
import { dbConnect } from "./config/db";
import { router } from "./routes/route";

dbConnect();

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
