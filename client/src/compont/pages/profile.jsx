import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Lazyloading from "../loading";
import Go3 from "../../assets/sad.png";
import { Buffer } from "buffer";




const UserProfile = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returnError, setReturnError] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await fetch("https://library-management-system-2ku8.onrender.com/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBorrowedBooks(data);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
        setError("Server error");
        navigator("/500");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchBorrowedBooks();
  }, [navigator]);

  const handleReturnBook = async (bookId) => {
    try {
      const response = await fetch(`https://library-management-system-2ku8.onrender.com/book/return/${bookId}`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
      });
      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(errordata.message || "Failed to return book");
      }
      const data = await response.json();
      alert(data.message);
      setBorrowedBooks(borrowedBooks.filter(book => book.bookId._id !== bookId));
    } catch (err) {
      console.error("Error returning book:", err);
      setReturnError(err.message);
    }
  };

  if (loading) {
    return <div>{<Lazyloading />}</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {borrowedBooks.length === 0 ? (
        <div className="no-file-found h-screen flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <a
            href="/books"
            className="flex text-cyan-800 border border-cyan-800 py-2 px-6 gap-2 rounded mb-10 items-center"
          >
            <span>View All Books</span>
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 ml-2"
            >
              <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
          <img src={Go3} className="w-20 h-20" />
          <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
            <span className="text-2xl text-red-400">Oops!</span> You do not have any borrowed books{" "}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Check out the book store</p>
        </div>
      ) : (
        <div>
          <div>
            <a
              className="group w-fit flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:opacity-95 justify-center ring-none rounded-lg shadow-lg font-semibold py-2 px-4 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-cyan-500 border-cyan-violet-700 disabled:border-0 disabled:bg-cyan-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-cyan-800 active:text-gray-300 focus-visible:outline-cyan-500 text-sm sm:text-base dark:bg-gray-700 dark:border-gray-700 dark:border-b-gray-900 m-6"
              href="/books"
            >
              See All Books
            </a>
          </div>
          {returnError && <Alert severity="error">{returnError}</Alert>}
          <ul className="h-screen">
            {borrowedBooks.map((borrowedBook, index) => (
              <li key={index} className="mb-4 border p-4 rounded-md shadow-sm">
                <a
                  href="#"
                  className="flex justify-between border text-center items-center rounded-md cursor-pointer transition duration-500 shadow-sm hover:shadow-md hover:shadow-teal-400"
                >
                  <div className="w-16 p-2 shrink-0">
                    <img
                      className="object-cover w-full h-full"
                      src={`data:${borrowedBook.bookId.cover_image_mimetype};base64,${Buffer.from(borrowedBook.bookId.cover_image).toString('base64')}`}
                      alt="Product"
                    />
                  </div>
                  <div className="p-2 flex flex-col">
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg"> {borrowedBook.bookId.book_name}</p>
                      <span className="text-black text-sm"> Author {borrowedBook.bookId.author_name}</span>
                      <span className="text-black"> ISBN {borrowedBook.bookId.isbn}</span>
                      <p>
                        Borrowed Date:{" "}
                        {borrowedBook.createdAt ? new Date(borrowedBook.createdAt).toLocaleDateString() : "Invalid Date"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleReturnBook(borrowedBook.bookId._id)}
                      type='button'
                      className="bg-cyan-500 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded mr-5"
                    >
                      Return
                    </button>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserProfile;

