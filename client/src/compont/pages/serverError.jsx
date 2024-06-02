import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div class="bg-gray-100 px-2 text-center">
      <Link to="/" className=" absolute left-0">
        <button
          class="cursor-pointer border-2  text-white h-10 rounded-3xl px-4 bg-green-300  duration-200 hover:scale-125 active:scale-100"
          title="Go Back"
        >
            Go back
        </button>
      </Link>
      <div class="h-screen flex flex-col justify-center items-center">
        <h1 class="text-8xl font-extrabold text-red-500">500</h1>
        <p class="text-4xl font-medium text-gray-800">Internal Server Error</p>
        <p class="text-xl text-gray-800 mt-4">
          We apologize for the inconvenience. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ServerError;
