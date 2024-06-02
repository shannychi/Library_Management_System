const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const libraryUser = new Schema({
    Name: {type: String, require: true},
    // cover_image: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    role: {
        type: String, 
        require: false,
        default: "Member",
        enum: ["Member", "Admin"]
    },   
})

module.exports = mongoose.model('libraryUser', libraryUser);