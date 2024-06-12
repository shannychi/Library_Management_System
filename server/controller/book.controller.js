const Book = require('../routes/Book/bookRoute');
const BookModel = require('../Model/books');
const userModel = require('../Model/user');
const borrowBook = require("../Model/borrowedBook");
const returnBook = require('../Model/returnedBook')
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './public/uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique file names
  },
});

const upload = multer({ storage: storage }).single('cover_image');

module.exports = {
  //add book to database
  addBooks: async (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ message: "No file selected!" });
      }

      try {
        const { book_name, author_name, isbn, publisher } = req.body;
        const newBook = new BookModel({
          book_name,
          author_name,
          isbn,
          publisher,
          cover_image: req.file.filename //
        });
        await newBook.save();
        console.log(newBook);
        return res.status(200).json({ message: 'Book added successfully!', book: newBook });
      } catch (err) {
        console.log("Error adding book:", err);
        return res.status(500).json({ message: 'Server error' });
      }
    });
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



