import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert } from "@mui/material";
import DropdownRole from "../Function/dropdown"
import {  Checkbox } from "@nextui-org/react";


const SignupPage = () => {

    const [user, setUser] = useState({
        Name: '',
        email: '',
        password: '',
        role: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //handle change
    const handleChange = (e) => {
      const {name, value} = e.target;
      setUser({
        ...user,
        [name]:value
      });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://library-management-system-2ku8.onrender.com/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)

            });
            if(response.status === 409){
              const data = await response.json();
              setMessage(<Alert severity="error">{data.message}</Alert>); //user already exits
            }
            else if (response.status === 201) {
              const data = await response.json();
               setMessage(<Alert severity="success">{data.message}</Alert>);
                navigate('/login')
               
            }
            else {
              setMessage(<Alert severity="error">An error occured</Alert>)
            }
            console.log(response.data);
        }catch(err) {
            console.error('error submitting form:', err)
        }
    }

    const [adminChecked, setAdminChecked] = useState(false);
    const [patronChecked, setPatronChecked] = useState(false);
  
    const handleAdminChange = () => {
      setAdminChecked(!adminChecked);
      if(!adminChecked){
        setUser({
          ...user,
          role: 'Admin'
        });
        setPatronChecked(false);
      }else {
        setUser(
          {
            ...user,
            role: ""
          }
        )
      }

    };
  
    const handlePatronChange = () => {
      setPatronChecked(!patronChecked);
      if(!patronChecked){
        setUser({
          ...user,
          role: 'Member'
        });
        setAdminChecked(false)
      }else {
        setUser({
          ...user,
          role: ""
        })
      }
    }
    return ( 
        <>       

<div className="bg-white dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
         
         <form onSubmit={handleFormSubmit}>
           <div className="bg-white px-10 py-8 rounded-xl w-screen  shadow-large max-w-sm">
               <div className="space-y-4">
               {message && <p>{message}</p>}
                   <h1 className="text-center text-2xl font-semibold text-gray-600">Sign Up</h1>
                   <hr/>
                   <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                   <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5 text-gray-400" fill="none"  stroke="currentColor"><title/><g data-name="Layer 7" id="Layer_7"><path className="cls-1 w-5 h-5" d="M19.75,15.67a6,6,0,1,0-7.51,0A11,11,0,0,0,5,26v1H27V26A11,11,0,0,0,19.75,15.67ZM12,11a4,4,0,1,1,4,4A4,4,0,0,1,12,11ZM7.06,25a9,9,0,0,1,17.89,0Z"/></g></svg>
                   <input className="pl-2 outline-none border-none w-full" type="text" value={user.Name} name="Name"  placeholder="Name" onChange={handleChange} required/>

               </div>
               <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                   </svg>
                   <input className="pl-2 outline-none border-none w-full" type="email" value={user.email} name="email" placeholder="Email" onChange={handleChange} required/>

               </div>
               <div className="flex items-center border-2 py-2 px-3 rounded-md">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                   </svg>
                   <input className="pl-2 outline-none border-none w-full" type="password" value={user.password} name="password"  id="" onChange={handleChange} placeholder="Password" required/>
                   
               </div>
               </div>
               <div className="m-3">
            <span className="text-sm">Select Role</span>
              <div className="flex gap-2">
              <Checkbox value="Admin" checked={adminChecked} onChange={handleAdminChange} >ADMIN</Checkbox>
            <Checkbox value="Member" checked={patronChecked} onchange={handlePatronChange}>PATRON</Checkbox>
              </div>
          </div>

               <button type="submit"  id="login" className="mt-6 w-full shadow-xl bg-gradient-to-tr from-cyan-600 to-red-700 hover:to-red-500 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000">Sign Up</button>
               <hr/>
               <div className="flex justify-center items-center mt-4">
                   <p className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                       <span className="ml-2">Already have an account?<a href="/login" className="text-xs ml-2 text-cyan-500 font-semibold">login now &rarr;</a>
                       </span>
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

{/* <div class="bg-blue-100 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
  <div class="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
     {message && <p>{message}</p>}
    <form class="p-12 md:p-24" onSubmit={handleFormSubmit}>
    <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" id="name" value={user.Name} name="Name"  class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Your Name" onChange={handleChange}/>
      </div>

      <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
          <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
        </svg>
        <input type="text" id="email" value={user.email} name="email"  class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="email" onChange={handleChange}/>
      </div>

     
      <div class="flex items-center text-lg mb-6 md:mb-8">
        <svg class="absolute ml-3" viewBox="0 0 24 24" width="24">
          <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
        </svg>
        <input type="password" id="password" value={user.password} name="password" class="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" onChange={handleChange}/>
      </div>
      <div className="m-3">
            <span className="text-sm">Select Role</span>
              <div className="flex gap-2">
              <Checkbox value="Admin" checked={adminChecked} onChange={handleAdminChange} >ADMIN</Checkbox>
            <Checkbox value="Member" checked={patronChecked} onchange={handlePatronChange}>PATRON</Checkbox>
              </div>
          </div>
      
      <button type="submit" class=" bg-cyan-950 font-medium p-2 md:p-4 text-white uppercase w-full rounded hover:bg-cyan-700">sign up</button>
      <a href="/login" className="text-sm font-thin text-cyan-900  hover:text-cyan-500">Already registered? log in</a>
    </form>
  </div>
 </div>
  */}
        </>
     );
}
 
export default SignupPage;