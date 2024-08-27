import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());
import { jwtDecode } from "jwt-decode";
import { Book } from '../models/bookmodel';
import multer from 'multer';
import { upload } from '../middleware/fileupload';

const addBook = async(req:Request,res:Response)=>{
    try{
        const token :any = req.headers.authorization;
        const decoded_token : { username:String; id : String; iat : Date} = jwtDecode(token);
        const {bookname,book_author} = req.body;
        let user_id : String = decoded_token.id;
        const url = req.file?.path;
        async function insertBook(){
            const book = await Book.create({
                bookname : bookname,
                book_author : book_author,
                book_image_url : url,
                owner : user_id
            });
        }
        insertBook();
    }
    catch(err : any){
        console.log(err);
        res.send(err.message);
    }
    res.send("book inserted");
};


const updateBook = async(req:Request,res:Response)=>{
    try{
        const {book_id,book_author} = req.body;
        await Book.findOneAndUpdate({_id : book_id },{book_author : book_author});
        res.send("book updated");
    }catch(err: any){
        res.send(err.message);
    }
};


const deleteBook = async(req:Request,res:Response)=>{
    try{
        const {book_id} = req.body;
        await Book.findByIdAndDelete({_id : book_id });
        res.send("book Deleted");
    }catch(err: any){
        res.send(err.message);
    }
}

export {addBook,updateBook,deleteBook};