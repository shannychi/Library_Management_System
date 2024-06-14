const path = require('path')
const multer = require('multer');
const Book = require('../routes/Book/bookRoute');
const BookModel = require('../Model/books');
const userModel = require('../Model/user');
const borrowBook = require("../Model/borrowedBook");
const returnBook = require('../Model/returnedBook')


module.exports = {
  //add book to database
  addBooks: async (req, res, next) => {
    try {
      if (!req.files || !req.files.cover_image) {
        return res.status(400).json({ message: "No file selected!" });
      }

      const coverImage = req.files.cover_image;
      const coverImageData = coverImage.data;
      const coverImageMimeType = coverImage.mimetype;

      try {
        const { book_name, author_name, isbn, publisher, genres, description } = req.body;

        // Validate required fields
        if (!book_name || !author_name || !isbn || !publisher || !genres || !description) {
          return res.status(400).json({ message: 'All fields are required!' });
        }

        const newBook = new BookModel({
          book_name,
          author_name,
          isbn,
          publisher,
          description,
          genres,
          cover_image: coverImageData, // Save the file data
          cover_image_mimetype: coverImageMimeType // Save the file mime type
        });

        await newBook.save();
        console.log('Book added successfully:', newBook);
        return res.status(200).json({ message: 'Book added successfully!', book: newBook });
      } catch (err) {
        console.error('Error adding book:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      return res.status(500).json({ message: 'Unexpected server error', error: err.message });
    }

   

  
  },

  // allbook

  Books: async(req, res, next) => {
    try{
        const books  = await BookModel.find();
        console.log(books);
        res.json(books)
    } catch (err) {
        console.log("error getting books", err)
        res.status(500)
    }
},

Borrow: async(req, res, next) => {
   try{
    const { bookId } = req.params;
    const userId  = req.userId;

console.log("userId:", userId);

    const borrowedAlready =  await borrowBook.findOne({userId, bookId});

    if(borrowedAlready && borrowedAlready.active) {
     return res.status(403).json({message: `check back later, ${book.book_name} is not avaiable now.`})
    }


    const activeBorrowedCount = await borrowBook.countDocuments({ userId, active: true});

    if(activeBorrowedCount >= 3) {
      return res.status(403).json({
        message:  "You have reached the limit of 3 borrowed books. Please return a book before borrowing another one."
      })
    }

    const book = await BookModel.findById(bookId)
    if(!book) {
     res.status(410).json({
       message: "sorry We do not have this book"
     })
    }
    if(book.quantity <= 0) {
     return res.status(404).json({
       message: `check back later, ${book.book_name} is not avaiable now.`
     })
    }

    book.quantity -= 1;
    await book.save();

    await borrowBook.create({
      userId, bookId, borrowedDate: new Date(),
      active: true
    });
     return res.status(200).json({message: `you have sucessfully borrowed book ${book.book_name}`})
   }
   catch(err) {
    console.log("error borrowing books", err)
        res.status(500)
   }
       
},

returnBook: async(req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.params; // Destructure bookId from req.params

    const borrowedBook = await borrowBook.findOne({ userId, bookId });

    if (!borrowedBook) {
      return res.status(404).json({
        message: "Borrowed book record not found",
      });
    }

    if (!borrowedBook.active) {
      return res.status(403).json({
        message: "Book has already been returned",
      });
    }

    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Sorry, we do not have this book or it may have been deleted",
      });
    }

    // Update the borrowedBook to mark it as inactive (returned)
    borrowedBook.active = false;
    await borrowedBook.save();

    return res.status(200).json({ message: "Book returned successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

},
 
getTotalUserAndBook: async(req, res, next) => {
  try {
    const user_count = await userModel.countDocuments();
    const book_count = await BookModel.countDocuments(); // Assuming this should count books, not users
    res.json({ user_count, book_count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
}



