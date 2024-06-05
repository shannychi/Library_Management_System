const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')

const  BookRoutes = require('./routes/Book/bookRoute');
const  userRoute = require('./routes/Book/userRoute');

const app = express();
const port = process.env.PORT || 8000


app.use(cors({
    origin:  'http://localhost:5173',
   methods: ['GET', 'POST'],
   credentials: true
}))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookParser())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

//datebase connection
const mogoDb = process.env.MONGODB_URL
mongoose.connect(mogoDb).then(console.log("connected to database"));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));



app.use('/book', BookRoutes);
app.use('/user', userRoute)


app.listen(process.env.PORT, '0.0.0.0', function(err) {
    console.log("app listenning on port 8000", app.url)
})