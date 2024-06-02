const BookModel = require("../Model/books");

module.exports = {
    getAllBooks: async (next) => {
        try {
            const books  = await BookModel.find();
            return books
        }catch (err) {
            console.log(e.toString());
            next(e);
        }
       
        
    },

    addBook: async(next) => {
        try {
            const { book_name, author_name, isbn, publisher } = req.body;
      
            const newBook = await new BookModel({
              book_name,
              author_name,
              isbn,
              publisher,
            });
            newBook.save();
            return newBook;
          } catch (err) {
            console.log("error adding books ", err);
            next(err)
          }
    }
}