const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const library = new Schema({
    coll: {type: Schema.Types.ObjectId, ref: 'book', require: true},
    returnedDate: {type: Date, default: Date.now},
})

module.exports = mongoose.model('library', library)