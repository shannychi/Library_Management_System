const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    book_name: {type: String, required: true},
    cover_image: {type: String, default: ''},
    author_name: {type: String, required: true},
    isbn: {type: String, required: true},
    publisher: {type: String, required: true},
    genres: {type: String, require: true},
    quantity: {type: Number, default: 10}   
}, {timestamps: true})

module.exports = mongoose.model('book', book)