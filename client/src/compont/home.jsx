import library from "../assets/hero.webp"
import { motion } from "framer-motion";



const HomePage = () => {
    return ( 
        <>
    
 
     <div class="relative flex flex-col items-center h-screen lg:h-screen mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">


   
<div class="w-full h-full lg:w-1/2 lg:mb-10">

    <img class="h-full w-full object-cover lg:rounded-sm bg-white" src={library} alt="Winding mountain road"/>
   

</div>

<motion.div initial={{ opacity:0 }}
  animate={{ opacity:1 }}
  transition={{
    ease: "linear",
    duration: 2,
    x: { duration: 1 }
  }}>

<div
    class="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-10 lg:ml-20 xl:mt-24 xl:ml-12">
    
    <div class="flex flex-col p-12 md:px-16">
        <h2 class="text-1xl font-medium uppercase text-cyan-900 lg:text-4xl">Your Gateway to Knowledge</h2>
        <p class="mt-4">
        Our comprehensive library website offers a vast collection of digital resources, including e-books, audiobooks, academic journals, and multimedia materials. With user-friendly search tools, personalized recommendations, and access to exclusive content.
        </p>
      
        <div class="mt-8">
            <a href="/login"
                class="inline-block w-full lg:w-80 text-center text-lg font-medium text-gray-100 bg-cyan-900  border-solid border-2 rounded-2xl py-4 px-10 hover:bg-cyan-600 hover:shadow-md md:w-48">
                Checkout our book store</a>
        </div>
    </div>
</div>
</motion.div>

</div>
    


        </>
     );
}
 
export default HomePage;