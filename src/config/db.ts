import mongoose, { skipMiddlewareFunction } from "mongoose";
const { Schema } = mongoose;

async function dbConnect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
    console.log("connected successully");
  } catch (err) {
    console.log(err);
  }
}

export { dbConnect };
