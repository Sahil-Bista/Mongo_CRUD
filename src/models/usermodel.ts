import mongoose, { skipMiddlewareFunction } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String , required : true},
  password: { type: String, null:false, required:true },
  role: { type: String ,required:true},
});

const User = mongoose.model("user", userSchema);

export { User };
