import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //handle change
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
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (response.status === 404) {
        setMessage(<Alert severity="error">{data.message}</Alert>); //user does not exits
      } else if (response.status == 401) {
        setMessage(<Alert severity="error">{data.message}</Alert>); //incorrect password
      } else if (response.status === 200) {
        setMessage(<Alert severity="success">{data.message}</Alert>);
        navigate("/user");
      } else {
        setMessage(<Alert severity="error">An error occured!</Alert>);
      }
      console.log(response.data);
    } catch (err) {
      console.error("error submitting form:", err);
    }
  };
  return (
    <>
      <div class="bg-white dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
         
          <form onSubmit={handleFormSubmit}>
            <div class="bg-white px-10 py-8 rounded-xl w-screen  shadow-large max-w-sm">
                <div class="space-y-4">
                {message && <p>{message}</p>}
                    <h1 class="text-center text-2xl font-semibold text-gray-600">Login</h1>
                    <hr/>
                <div class="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input class="pl-2 outline-none border-none w-full" type="email" name="email" placeholder="Email" onChange={handleChange} required/>

                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <input class="pl-2 outline-none border-none w-full" type="password" name="password"  id="" onChange={handleChange} placeholder="Password" required/>
                    
                </div>
                </div>

                <button type="submit"  id="login" class="mt-6 w-full shadow-xl bg-gradient-to-tr from-cyan-600 to-red-700 hover:to-red-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Login</button>
                <hr/>
                <div class="flex justify-center items-center mt-4">
                    <p class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span class="ml-2">You don't have an account?<a href="/signup" class="text-xs ml-2 text-blue-500 font-semibold">Register now &rarr;</a>
                        </span>
                    </p>
                </div>
            </div>
            <div class="pt-6 text-base font-semibold leading-7">
                <p class="font-sans text-red-500 text-md hover:text-red-800">
                <a href="/" className="absolute text-cyan-800">&larr; Home</a>
                </p>
            </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
