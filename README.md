![website image](/screenshots/Screenshot%202024-06-15%20093407.png)

<https://library-management-system2.netlify.app/>

# Library Management System

### Description
The Library Management System is a web application designed to help manage a library's collection of books. Users can add new books to the database, including uploading a cover image for each book, as well as edit or delete existing entries. The system is built using React for the front end and Node.js for the back end, with MongoDB as the database.

### Features

- Add new books with details such as book name, author, ISBN, publisher, description, genres, and cover image by library Admin.
 - Register and sign in new users
- View a list of all books in the library.
- Borrow and return books by users.

### Technologies Used
- **Frontend :** React, NextUI
- **Backend :** Node.js, Express.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS

### Installation

**git clone** <https://github.com/shannychi/Library_Management_System>

***Navigate to the project directory:*** cd library-management-system

***Install dependencies for both client and server***

`cd client`
`npm install`
`cd /server`
`npm install`

### Configure the environment variables:

- Create a .env file in the root of the server directory.

- Add the following variables:

`PORT=8000`
`MONGODB_URI=your_mongodb_connection_string`
`JWT_SECRET=your_jwt_secret`
`NODE_ENV=production`

### Start the development server:
`cd server`
`npm start`

### Start the client 
`cd client`
`npm run dev`

### API Endpoints
- POST **/book/add-book**: Endpoint to handle adding book to database.
- GET **/book/books**: Endpoint to fetch all book
- GET **/book/borrow/**:bookId: Endpoint to  borrow book.
- GET **/return/:bookId**: Endpoint to  return a book
- GEt **/book/totaldata**: Endpoint to get tootal number of book and users in the database
- POST **/login**: Endpoint to handle user login
- POST **/signup**: Endpoint to register new users
- GET **/profile**: Endpoint to get user profile
- GET **/role** : Endpoint to get user role
- POST **/logout**: Endpoint to logout users


## Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
Make your changes.
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.






