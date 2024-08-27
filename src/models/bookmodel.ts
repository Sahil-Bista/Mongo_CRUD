import mongoose, { skipMiddlewareFunction } from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    bookname : { type : String},
    book_author : {type : String, required : true},
    book_image_url : {type : String},
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
});

const Book = mongoose.model("book",bookSchema);

export {Book};