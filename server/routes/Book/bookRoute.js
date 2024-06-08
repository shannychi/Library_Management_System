const express = require('express');
const router = express.Router();
const { bookController } = require("../../controller/index")
const { auth } = require("../../middware/auth")
const { isAdmin } = require("../../middware/authbook")


const Book = router;

//Get Add book 

// Book.get("/", (req,res) => {

// })

//post add book
Book.post("/add-book", auth, isAdmin, bookController.addBooks)
Book.get("/books", auth, bookController.Books)
Book.post("/borrow/:bookId", auth, bookController.Borrow)
Book.post("/return/:bookId", auth, bookController.returnBook)
Book.get("/totaldata", bookController.getTotalUserAndBook)
module.exports = Book;