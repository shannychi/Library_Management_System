const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const returnBook = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'book', require: true},
    bookId: {type: Schema.Types.ObjectId, ref: 'libraryUser', require: true},
    returnedDate: {type: Date, default: Date.now},
})

module.exports = mongoose.model('returnBook', returnBook)