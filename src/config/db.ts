import mongoose, { skipMiddlewareFunction } from 'mongoose';
const { Schema } = mongoose;

async function dbConnect(){
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
    console.log("connected successully");
    }
    catch(err){
        console.log(err);
    }
}

// dbConnect();

// const userSchema = new Schema({
//     username : { type : String},
//     password : { type : String} ,
//     role : {type : String}  
// })

// const bookSchema = new Schema({
//     bookname : { type : String},
//     book_author : {type : String, required : true},
//     book_image_url : {type : String},
//     owner: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//       }
// });



// const User = mongoose.model("user",userSchema);
// const Book = mongoose.model("book",bookSchema);

export { dbConnect };