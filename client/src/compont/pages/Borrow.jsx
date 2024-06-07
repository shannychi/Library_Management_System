import { useEffect, useState } from "react";

const BorrowBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await fetch('https://library-management-system-2ku8.onrender.com/book/borrow/:bookId', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(books)
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
    fetchBooksData();
  }, []);

  return (
    <ul className="h-screen">
      {books.map((book, index) => (
        <li key={index}>
          <a
            href="#"
            className="flex border items-center rounded-md cursor-pointer transition duration-500 shadow-sm hover:shadow-md hover:shadow-teal-400"
          >
            <div className="w-16 p-2 shrink-0">
              <img
                src="https://www.svgrepo.com/show/502433/tool.svg"
                alt=""
                className="h-12 w-12"
              />
            </div>
            <div className="p-2 flex flex-col lg:flex-row">
              <div className="">
              <p className="font-semibold text-lg">Name:{book.book_name}</p>
              <span className="text-gray-600"> Author:{book.author_name}</span>
              <span className="text-gray-600"> ISBN:{book.isbn}</span>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BorrowBook;
