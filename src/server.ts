import express, { Request, Response } from 'express';
import mongoose, { skipMiddlewareFunction } from 'mongoose';
const { Schema } = mongoose;
const app = express();
const port: number = 3000;
app.use(express.json());
import jwt from 'jsonwebtoken';
import { jwtDecode } from "jwt-decode";
import { middleware } from "../src/middleware/auth";

async function dbConnect(){
    try{
    // await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
    console.log("connected successully");
    }
    catch(err){
        console.log(err);
    }
}

dbConnect();


const userSchema = new Schema({
    username : { type : String},
    password : { type : String} ,
    role : {type : String}  
})

userSchema.virtual('books',{//virtulal property named books
    ref : 'book',
    localField : '_id',
    foreignField : 'owner'
});


const bookSchema = new Schema({
    bookname : { type : String},
    book_author : {type : String},
    book_image_url : {type : String},
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
})


const role = "user";

const User = mongoose.model("user",userSchema);
const Book = mongoose.model("book",bookSchema);

// async function insertBook(){
//     const book = await Book.create({
//         bookname : "Nishan",
//         book_author : "Nishan",
//         book_image_url : "ohdiwbeibewjvkc",
//         owner: {
//             type: Schema.Types.ObjectId,
//             required: true,
//             ref: 'User'
//           }
//     })
// }

// insertBook();


// async function insertValues(){
// const newUser =await User.create(
//     {
//         username : "Sahil",
//         password : "sahil123",
//         role : role
//     }
// )
// console.log(newUser);
// }
// insertValues()


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Node.js + Express!');
});


app.post("/signup",(req:Request,res:Response)=>{
    const {username,pwd} = req.body;
    console.log(username,pwd);
    if(!username || !pwd){
        return res.status(400).send("Username and password required");
    }
    try{
        const newUser = User.create(
            {
                username : username,
                password : pwd,
                role : role 
            }
        )
    }catch(err: any){
        console.log(err.message);
        res.send("Some wrror with db");
    }
    res.send("user signed up")
});

app.post('/login', async(req,res)=>{
    try{
        const {username,pwd} = req.body;
        console.log(username,pwd);
        if(!username || !pwd){
            return res.status(400).send("Username and password required");
        }
        const user = await User.findOne({username : username});
        if (!user) {
            return res.send("user unavailable");
        }
        const payload = {
            username : username, 
            id : user._id,
        };
        const secret_key = "BigBigSecret";
        if(!secret_key){
            return res.status(500).send("Secret key not configured");
        }
        const token = jwt.sign(payload, secret_key);
        res.send(token);
    }catch(err : any){
        console.log(err.message);
        res.send("User could not be logged in");
    }
});

app.post('/addBook', middleware ,async(req,res)=>{
    try{
        const token :any = req.headers.authorization;
        const decoded_token = jwtDecode(token);
        let id = decoded_token;
        res.send(id);
    }
    catch(err : any){
        console.log(err);
        res.send(err.message);
    }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});