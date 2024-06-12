import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert } from "@mui/material";

const SignupPage = () => {
    const [user, setUser] = useState({
        Name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://library-management-system-2ku8.onrender.com/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            if (response.status === 409) {
                setMessage(<Alert severity="error">{data.message}</Alert>);
            } else if (response.status === 201) {
                setMessage(<Alert severity="success">{data.message}</Alert>);
                navigate('/login');
            } else {
                setMessage(<Alert severity="error">An error occurred</Alert>);
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
            <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-large max-w-sm">
                    <div className="space-y-4">
                        {message && <p>{message}</p>}
                        <h1 className="text-center text-2xl font-semibold text-gray-600">Sign Up</h1>
                        <hr />
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor">
                                <title />
                                <g data-name="Layer 7" id="Layer_7">
                                    <path className="cls-1 w-5 h-5" d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z" />
                                </g>
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="text" value={user.Name} name="Name" placeholder="Name" onChange={handleChange} required />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="email" value={user.email} name="email" placeholder="Email" onChange={handleChange} required />
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none w-full" type="password" value={user.password} name="password" onChange={handleChange} placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-cyan-600 to-red-700 hover:to-red-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Sign Up</button>
                    <hr />
                    <div className="flex justify-center items-center mt-4">
                        <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                            <span className="ml-2">Already have an account? <a href="/login" className="text-xs ml-2 text-cyan-500 font-semibold">login now &rarr;</a></span>
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

export default SignupPage;
