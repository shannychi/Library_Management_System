import { useEffect, useState } from "react";

const Headertext = ({text1}) => {
const [data, setData] = useState({user_count:0, book_count:0});

useEffect(() => {
    const fetchData = async() => {
        try{
            const response = await fetch('https://library-management-system-2ku8.onrender.com/book/totaldata');
            const result = await response.json();
            setData(result);
        }catch(err) {
            console.error('error fetching data:', err)
        }
    };
    fetchData();
}, [])

    return ( 
        <div class=" w-full md:max-w-3xl mx-auto text-center mt-16">
        <h1 class="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">{text1}</span>
            <span class="absolute bottom-0 right-10 lg:left-0 w-96 lg:w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500"></span>
        </h1>
        {/* <p class="text-lg text-gray-800 mb-8"> Total number of <span>{data.user_count}</span> users and <span>{data.book_count}</span> books avialable</p> */}
    </div>
    
     );
}
 
export default Headertext;