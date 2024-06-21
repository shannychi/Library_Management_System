const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const fileUpload = require('express-fileupload');
const path = require('path')

const BookRoutes = require('./routes/Book/bookRoute');
const userRoute = require('./routes/Book/userRoute');

const app = express();
const port = process.env.PORT || 8000

// CORS setup
var whitelist = ['http://localhost:5173', 'https://library-management-system2.netlify.app'];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true); // Allow non-browser requests
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,// Allow credentials
// };

const corsOptions = {
  origin: whitelist,
  credential: true,
};

app.use(cors(corsOptions)); // Use CORS middleware with the options object

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

// Database connection
const mongoDb = process.env.MONGODB_URL
mongoose.connect(mongoDb).then(() => console.log("Connected to database"));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// Routes
app.use('/book', BookRoutes);
app.use('/user', userRoute)

app.listen(port, function (err) {
  console.log("App listening on port", port, err || '')
});
