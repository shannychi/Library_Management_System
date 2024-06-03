const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const  BookRoutes = require('./routes/Book/bookRoute');
const  userRoute = require('./routes/Book/userRoute');

const app = express();
const port = process.env.PORT || 8000


const allowedOrigins = [
    'http://localhost:5173',
    'https://library-management-system2.netlify.app'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookParser())
app.use(express.json())


app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
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
    res.setHeader()
    console.log("app listenning on port 8000")
})