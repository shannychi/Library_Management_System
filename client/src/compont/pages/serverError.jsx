import { Link } from "react-router-dom";

const ServerError = () => {
  return (
    <div class="bg-gray-100 px-2 text-center">
       <div className="pt-6 text-base font-semibold leading-7">
                    <p className="font-sans text-red-500 text-md hover:text-red-800">
                        <a href="/" className="absolute text-cyan-800">&larr; Home</a>
                    </p>
                </div>
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
