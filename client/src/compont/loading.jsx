import {Spinner} from "@nextui-org/react";

const loading = () => {
    return ( <>
    <div id="loading-overlay"  className="fixed h-screen inset-0 z-50 flex items-center justify-center bg-white bg-opacity-60">

    <Spinner/>

</div>
    </> );
}
 
export default loading;