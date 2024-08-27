import mongoose, { skipMiddlewareFunction } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username : { type : String},
    password : { type : String} ,
    role : {type : String}  
})

const User = mongoose.model("user",userSchema);

export {User};