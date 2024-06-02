import { useState } from "react";
import bookicon from "../assets/book.webp"

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }
    return ( 
        <>
    <nav class="flex flex-wrap items-center justify-between p-3  bg-cyan-900">
    <img src={bookicon} class="h-6 w-6" alt="ACME" width="120" />
    <div class="flex md:hidden">


    <label>
  <div
    class="w-9 h-10 cursor-pointer flex flex-col items-center justify-center"
  >
    <input class="hidden peer" type="checkbox" id="hamburger " onClick={toggleMenu}/>
    <div
      class="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"
    ></div>
    <div
      class="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden"
    ></div>
    <div
      class="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"
    ></div>
  </div>
</label>

         
    </div>
    <div
        class={`toggle  ${menuVisible ? '' : 'hidden'} w-full md:w-auto md:flex text-left text-bold mt-5 md:mt-0 border-t-2 border-blue-100 md:border-none`}>
        <a href="/"
            class="block md:inline-block text-white hover:text-blue-100 px-3 py-3 border-b-2 border-blue-100 md:border-none">Home
        </a>
        <a href="/login"
            class="block md:inline-block text-white hover:text-blue-100 px-3 py-3 border-b-2 border-blue-100 md:border-none">Login
        </a>
        <a href="/signUp"
            class="block md:inline-block text-white hover:text-blue-100 px-3 py-3 border-b-2 border-blue-100 md:border-none">Sign up
        </a>
    </div>
</nav>
        </>
     );
}
 
export default Navbar;