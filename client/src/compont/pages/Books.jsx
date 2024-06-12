import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";
import Lazyloading from "../loading";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import SearchInput from "../Function/searchinput";
import { motion } from "framer-motion";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const navigate = useNavigate();

  // Fetch Book Api to display books
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
  }, [navigate]);

  // Fetch post request for user to borrow book
  const borrowedBook = async (bookId) => {
    try {
      const response = await fetch(
        `https://library-management-system-2ku8.onrender.com/book/borrow/${bookId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setMessage(<Alert severity="error">{data.message}</Alert>);
      } else {
        if (response.status === 403 || response.status === 404 || response.status === 410) {
          setMessage(<Alert severity="error">{data.message}</Alert>);
        } else if (response.status === 200) {
          setMessage(<Alert severity="success">{data.message}</Alert>);
          setBooks(books.map((book) => (book._id === data._id ? data : book)));
        } else {
          setMessage(<Alert severity="error">{data.message}</Alert>);
        }
      }
    } catch (err) {
      console.error("Error borrowing book:", err);
    } finally {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  // Search method
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = books.filter(
      (book) =>
        book.book_name.toLowerCase().includes(query) ||
        book.author_name.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query) ||
        book.publisher.toLowerCase().includes(query) ||
        book.genres.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  const displayBooks = filteredBooks.slice(first, first + rows);

  if (loading) {
    return <div>{<Lazyloading />}</div>;
  }

  // Animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerDirection: -1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <div className="">
      <SearchInput value={searchQuery} onChange={handleSearch} />
      <Paginator
        className="gap-5 h-20 w-full mt-2 lg:mt-0"
        first={first}
        rows={5}
        totalRecords={200}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      />

      <div>
        <motion.ul variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
          {displayBooks.map((book, index) => (
            <motion.li variants={item} key={index}>
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <div></div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                    {book.book_name}
                  </h3>
                  <p className="text-gray-900 font-bold text-large">By {book.author_name}</p>
                  <p className="text-gray-900 text-sm mt-2">
                    Available books <span className="text-green-500 font-semibold">{book.quantity}</span>
                  </p>
                  <p className="text-gray-900 text-sm mt-2">Publish by {book.publisher}</p>
                  <span className="text-gray-900 font-bold text-lg">ISBN {book.isbn}</span>
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
                      onPress={() => {
                        setSelectedBook(book);
                        onOpen();
                      }}
                      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg mt-20 ml-20"
                    >
                      View Details
                    </Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">{selectedBook?.book_name}</ModalHeader>
                            <ModalBody>
                              <div>{message && <div>{message}</div>}</div>
                              <p>{selectedBook?.genres}</p>
                              <p>{selectedBook?.description}</p>
                            </ModalBody>
                            <ModalFooter>
                              <Button color="danger" variant="light" onPress={onClose}>
                                Close
                              </Button>
                              <Button color="primary" onClick={() => borrowedBook(selectedBook._id)}>
                                Borrow
                              </Button>
                            </ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Books;

