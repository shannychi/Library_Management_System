import { useState } from "react";
import { Alert } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Function/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [redirectToProfile, setRedirectToProfile] = useState(false); // state for redirection
  const navigate = useNavigate();
  const { login } = useAuth();

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://library-management-system-2ku8.onrender.com/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.status === 404) {
        setMessage(<Alert severity="error">{data.message}</Alert>); // user does not exist
      } else if (response.status == 401) {
        setMessage(<Alert severity="error">{data.message}</Alert>); // incorrect password
      } else if (response.status === 200) {
        setMessage(<Alert severity="success">{data.message}</Alert>);
        login(data.role);
        navigate('/user') // set redirection state to true
      } else {
        setMessage(<Alert severity="error">An error occurred!</Alert>);
      }
    } catch (err) {
      console.error("error submitting form:", err);
      setMessage(<Alert severity="error">An error occurred!</Alert>);
    }
  };

  // if (redirectToProfile) {
  //   return <Navigate to="/user" />; // navigate to user profile page
  // }

  return (
    <div className="bg-white dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-large max-w-sm">
          <div className="space-y-4">
            {message && <p>{message}</p>}
            <h1 className="text-center text-2xl font-semibold text-gray-600">Login</h1>
            <hr />
            <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <input className="pl-2 outline-none border-none w-full" type="email" name="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <input className="pl-2 outline-none border-none w-full" type="password" name="password" id="" onChange={handleChange} placeholder="Password" required />
            </div>
          </div>
          <button type="submit" id="login" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-cyan-600 to-red-700 hover:to-red-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Login</button>
          <hr />
          <div className="flex justify-center items-center mt-4">
            <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
              <span className="ml-2">You don't have an account? <a href="/signup" className="text-xs ml-2 text-cyan-500 font-semibold">Register now &rarr;</a></span>
            </p>
          </div>
        </div>
        <div className="pt-6 text-base font-semibold leading-7">
          <p className="font-sans text-red-500 text-md hover:text-red-800">
            <a href="/" className="absolute text-cyan-800">&larr; Home</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

