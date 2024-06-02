import { useEffect, useState } from "react";
import { Paginator } from 'primereact/paginator';
import Lazyloading from "../loading"
import { useNavigate } from "react-router-dom";
import { Message } from 'primereact/message';
import Heardertext from "../hearder"
        


const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [message, setMessage] = useState('');
  const [newBook, setNewBook] = useState({
    book_name: '',
    author_name: '',
    isbn: '',
    publisher: ''
  });
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(6)
  const navigate = useNavigate();
  //
  //Fetch Book Api to display books
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const response = await fetch('http://localhost:8000/book/books', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          navigate('/login')
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }finally {
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
    try{
      const response = await fetch(`http://localhost:8000/book/borrow/${bookId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'applicationn'
        },
        body: JSON.stringify(newBook)
      });
      if(!response.ok) {
       navigate('/login')
      }
      else {
        const data = await response.json();
        if (response.status === 403 || response.status === 404 || response.status === 410) {
          setMessage(<Message severity="error" text={data.message} />);
        } else if (response.status === 200) {
          setMessage(<Message severity="success" text={data.message} />);
          setBooks(books.map(book => book._id === data._id ? data : book));
        } else {
          setMessage(<Message severity="error" text="An error occoured! try again later" />);
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
    }
    catch(err){
     console.error('error borrwing book:', err)
    }finally{
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
  const filtered = books.filter(book => 
    book.book_name.toLowerCase().includes(query) ||
    book.author_name.toLowerCase().includes(query) ||
    book.isbn.toLowerCase().includes(query) ||
    book.publisher.toLowerCase().includes(query)
  );
  setFilteredBooks(filtered);
}

const displayBooks = filteredBooks.slice(first, first + rows);

if (loading) {
  return <div>{<Lazyloading />}</div>;
}
  return (
   <div className="">
        <Heardertext text1 = "welcome to book store"/>
    <div className="flex flex-col-reverse m-10">
    <Paginator className="gap-5 h-20 w-full mt-5 lg:mt-0 " first={first} rows={1} totalRecords={200}  onPageChange={onPageChange} template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"/>
    <div class=" w-40 ">
    <div class="container m-10 lg:m-0 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div class=" absolute items-center right-8 lg:right-0 mb-4 lg:mb-0 lg:mt-20 lg:mr-3">

            <input type="text" className="bg-white border-2  border-cyan-950 h-14 w-96 pr-8 pl-5 text-black rounded z-0 focus:shadow focus:outline-none" placeholder="Search for book..."
            value={searchQuery}
            onChange={handleSearch}
            />

            {/* <div class="absolute top-4 right-3">
                <i class="fa fa-search text-white z-20 hover:text-white"></i>
            </div> */}

        </div>
    </div>
</div>
    </div>
   
    <div> 
    {message && <div>{message}</div>}
    <a href="/user" class="cursor-pointer duration-200 hover:scale-125 active:scale-100 ml-10 font-bold text-cyan-400 ">Go Back</a>
    <ul className=" grid grid-cols-1 md:grid-cols-3 gap-8 m-10">
      {displayBooks.map((book, index) => (
        <li key={index}>
          <form  onSubmit={(e) => borrowedBook(e, book._id)}>
          <div class="bg-cyan-50  rounded-lg shadow-lg p-8">
                <div class="relative overflow-hidden">
                    <img class="object-cover w-40 h-40" src={`http://localhost:8000${book.cover_image}`} alt="Product"/>
                    {/* <div class="absolute inset-0 bg-black opacity-40"></div> */}
                    {/* <div class="absolute inset-0 flex items-center justify-center">
                        <button class="bg-white text-gray-900 py-2 px-6 rounded-full font-bold hover:bg-gray-300">{book.book_name}</button>
                    </div> */}
                </div>
                <h3 class="text-xl font-bold text-gray-900 mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500 ">{book.book_name}</h3>
                <p class="text-gray-900 font-semibold text-normal mt-2">Author {book.author_name}</p>
                <p class="text-gray-900 text-sm mt-2">Available books <span className="text-green-500 font-semibold">{book.quantity}</span></p>
                <p class="text-gray-900 text-sm mt-2">Publish by {book.publisher}</p>
                <div class="flex items-center justify-between mt-4 ">
                    <span class="text-gray-900 font-bold text-lg">ISBN {book.isbn}</span>
                    <button type="submit" class="bg-cyan-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Borrow</button>
                </div>
            </div>
          {/* <a
            href="#"
            className="flex justify-between  border items-center rounded-md cursor-pointer transition duration-500 shadow-sm hover:shadow-md hover:shadow-teal-400">

              
            <div className="w-16 p-2 shrink-0">
              <img
                src="https://www.svgrepo.com/show/502433/tool.svg"
                alt=""
                className="h-12 w-12"
              />
            </div>
            <div className=" ">
              <div className="p-2 flex flex-col text-center">
              <p className="font-semibold text-lg">{book.book_name}</p>
              <span className="text-gray-600"> Author:{book.author_name}</span>
              <span className="text-gray-600"> ISBN:{book.isbn}</span>
                 <span className="">Remaining book: <span className=" text-green-500 font-bold">{book.quantity}</span></span>
              </div>
            </div>
            <button type='submit' className=" bg-cyan-800 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded mr-5">Borrow</button>
          </a> */}
          </form>
        </li>
      ))}
    </ul>
    </div>
   </div>
  );
};

export default Books;
