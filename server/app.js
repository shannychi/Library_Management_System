const express = require('express');
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const  BookRoutes = require('./routes/Book/bookRoute');
const  userRoute = require('./routes/Book/userRoute');

const app = express();
const port = process.env.PORT || 8000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookParser())
app.use(express.json())


app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

//server static file 
app.use(express.static('public'));

//datebase connection
const mogoDb = process.env.MONGODB_URL
mongoose.connect(mogoDb).then(console.log("connected to database"));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));



app.use('/book', BookRoutes);
app.use('/user', userRoute)


app.listen(port, (req, res) => {
    console.log("app listenning on port 8000")
})