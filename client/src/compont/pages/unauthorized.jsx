const Unauthorized = () => {
    return ( 
        <div>
            <div class="bg-gray-100 ">
    <div class="h-screen  flex flex-col justify-center items-center">
        <h1 class=" text-3xl lg:text-8xl font-bold text-red-800">Unauthorized</h1>
        <p class=" text-1xl lg:text-4xl font-medium text-gray-800">Only Admin has access to this page</p>
        <a href="/" class="mt-4 text-xl text-blue-600 hover:underline">Go back home</a>
    </div>
</div>
        </div>
     );
}
 
export default Unauthorized;