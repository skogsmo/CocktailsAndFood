import {Link} from "react-router-dom"
import AbortButton from "../components/abortButton";

const Start: React.FC = () => {
    return (
        <>

            <AbortButton/>


            <div className="flex flex-col gap-4 h-screen justify-center items-center">
                <h1 className="text-5xl font-bold text-center">
                    Bowls & Cocktails
                </h1>
                <span>Vi skriver massor av extra text här för att se hur min
                egna branch fungerar, funkar det?</span>
            <Link to="/menu"> 
            <button className="py-4 px-6 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md">
            <span>
                Till menyn
            </span>
            </button>
            </Link>
            <Link to="/testapi"> 
            <button className="py-4 px-6 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md">
            <span>
                Hämta test-API
            </span>
            </button>
            </Link>
            
            </div>
        </>
    );
};

export default Start;