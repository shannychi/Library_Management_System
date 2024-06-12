import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { Textarea, Select, SelectItem } from "@nextui-org/react";

const AddBook = () => {
  const [book, setBook] = useState({
    book_name: "",
    author_name: "",
    isbn: "",
    publisher: "",
    description: "",
    genres: "",
    cover_image: null,
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle change
  const handleChange = (e) => {
    if (e.target.name === "cover_image") {
      setBook({ ...book, cover_image: e.target.files[0] });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("book_name", book.book_name);
    formData.append("author_name", book.author_name);
    formData.append("isbn", book.isbn);
    formData.append("publisher", book.publisher);
    formData.append("genres", book.genres);
    formData.append("description", book.description);
    if (book.cover_image) {
      formData.append("cover_image", book.cover_image);
    }

    try {
      const response = await fetch(
        "https://library-management-system-2ku8.onrender.com/book/add-book",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(<Alert severity="warning">{data.message}</Alert>);
      } else if (response.status == 200) {
        setMessage(<Alert severity="success">{data.message}</Alert>);
      } else {
        setMessage(<Alert severity="warning">Server error</Alert>);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const BookGenres = [
    {key: "Literary-Fiction", label: "Literary Fiction"},
    {key: "Mystery", label: "Mystery"},
    {key: "Thriller", label: "Thriller"},
    {key: "Horror", label: "Horror"},
    {key: "Science-Fiction", label: "Science Fiction"},
    {key: "Romance", label: "Romance"},
    {key: "Comdey", label: "Comdey"},
  ]

  return (
    <>
      <div className="bg-green-200 min-h-screen flex items-center">
        <div className="bg-white p-10 md:w-2/3 lg:w-1/2 mx-auto rounded">
          {message && <p>{message}</p>}
          <form onSubmit={handleFormSubmit}>
            <div className="flex items-center mb-5">
              <label
                htmlFor="name"
                className="w-20 inline-block text-right mr-4 text-gray-500"
              >
                Book
              </label>
              <input
                name="book_name"
                value={book.book_name}
                id="name"
                type="text"
                onChange={handleChange}
                placeholder="Book Name"
                className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
              />
            </div>
            <div className="flex items-center mb-10">
              <label
                htmlFor="author"
                className="w-20 inline-block text-right mr-4 text-gray-500"
              >
                Author
              </label>
              <input
                type="text"
                name="author_name"
                value={book.author_name}
                id="author"
                onChange={handleChange}
                placeholder="Author Name"
                className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
              />
            </div>
            <div className="flex items-center mb-10">
              <label
                htmlFor="isbn"
                className="w-20 inline-block text-right mr-4 text-gray-500"
              >
                ISBN
              </label>
              <input
                type="text"
                name="isbn"
                value={book.isbn}
                id="isbn"
                onChange={handleChange}
                placeholder="ISBN"
                className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
              />
            </div>
            <div className="flex items-center mb-10">
              <label
                htmlFor="publisher"
                className="w-20 inline-block text-right mr-4 text-gray-500"
              >
                Publisher
              </label>
              <input
                type="text"
                name="publisher"
                id="publisher"
                value={book.publisher}
                placeholder="Publisher"
                onChange={handleChange}
                className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-green-400"
              />
            </div>

            <div>
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="max-w-xs"
                name="description"
                value={book.description}
                onChange={handleChange}
              />
            </div>

            <div className="mt-3">
            <Select
      isRequired
      label="Genres"
      placeholder="Select book genres"
      defaultSelectedKeys={["cat"]}
      className="max-w-xs"
      name="genres"
      value={book.genres}
      onChange={handleChange}
    >
      {BookGenres.map((genres) => (
        <SelectItem key={genres.key}>
          {genres.label}
        </SelectItem>
      ))}
    </Select>
            </div>
            <div className="mx-auto max-w-xs">
              <label
                htmlFor="cover_image"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Upload file
              </label>
              <input
                id="cover_image"
                type="file"
                name="cover_image"
                onChange={handleChange}
                className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-teal-500 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-white hover:file:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="py-3 px-8 bg-green-500 text-green-100 font-bold rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
