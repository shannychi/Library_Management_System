import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import Lazyloading from "../loading";
import { useNavigate } from "react-router-dom";
import { Message } from "primereact/message";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import Heardertext from "../hearder";
import SearchInput from "../Function/searchinput";
import { motion } from "framer-motion";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [newBook, setNewBook] = useState({
    book_name: "",
    author_name: "",
    isbn: "",
    publisher: "",
  });
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();
  //
  //Fetch Book Api to display books
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await fetch("https://library-management-system-2ku8.onrender.com/book/books", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          navigate("/login");
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchBooksData();
  }, []);

  //fetch post request for user to borrow book
  const borrowedBook = async (e, bookId) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://library-management-system-2ku8.onrender.com/book/borrow/${bookId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "applicationn",
          },
          body: JSON.stringify(newBook),
        }
      );
      if (!response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        if (
          response.status === 403 ||
          response.status === 404 ||
          response.status === 410
        ) {
          setMessage(<Message severity="error" text={data.message} />);
        } else if (response.status === 200) {
          setMessage(<Message severity="success" text={data.message} />);
          setBooks(books.map((book) => (book._id === data._id ? data : book)));
        } else {
          setMessage(
            <Message
              severity="error"
              text="An error occoured! try again later"
            />
          );
        }
      }
      // const AddBorrowBook = await response.json();
      // setBooks(books.map(book => book._id === AddBorrowBook._id ? AddBorrowBook : book));
      // setNewBook({
      //   book_name: '',
      //   author_name: '',
      //   isbn: '',
      //   publisher: '',
      //   userId: '',
      //   bookId: ''
      // })
    } catch (err) {
      console.error("error borrwing book:", err);
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  //Search method
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter(
      (book) =>
        book.book_name.toLowerCase().includes(query) ||
        book.author_name.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.publisher.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  const displayBooks = filteredBooks.slice(first, first + rows);

  if (loading) {
    return <div>{<Lazyloading />}</div>;
  }

  //Animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  return (
    <div className="">
      <SearchInput value = {searchQuery} onChange={handleSearch}/> 
      <Heardertext text1="welcome to book store" />
      
        <Paginator
          className="gap-5 h-20 w-full mt-5 lg:mt-0 "
          first={first}
          rows={1}
          totalRecords={200}
          onPageChange={onPageChange}
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />

      <div>
        {message && <div>{message}</div>}
        <a
          href="/user"
          class="cursor-pointer duration-200 hover:scale-125 active:scale-100 ml-10 font-bold text-cyan-400 "
        >
          Go Back
        </a>
        <motion.ul variants={container} initial="hidden" animate="show" className=" grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
          {displayBooks.map((book, index) => (
            <motion.li variants={item} key={index}>
              <form onSubmit={(e) => borrowedBook(e, book._id)}>
                <Card className="py-4">
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h3 class="text-xl font-bold text-gray-900 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 ">
                      {book.book_name}
                    </h3>
                    <p class="text-gray-900 font-bold text-large">
                     By {book.author_name}
                    </p>
                    <p class="text-gray-900 text-sm mt-2">
                      Available books{" "}
                      <span className="text-green-500 font-semibold">
                        {book.quantity}
                      </span>
                    </p>
                    <p class="text-gray-900 text-sm mt-2">
                      Publish by {book.publisher}
                    </p>
                    <span class="text-gray-900 font-bold text-lg">
                      ISBN {book.isbn}
                    </span>
                  </CardHeader>

                  <CardBody className="overflow-visible py-2">
                    <div className="flex gap-2">
                      <Image
                        className="object-cover rounded-xl h-40 w-40"
                        src={`https://library-management-system-2ku8.onrender.com${book.cover_image}`}
                        alt="Product"
                      />
                      <Button
                        radius="full"
                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-20 ml-20"
                      >
                        Borrow
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </form>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Books;
