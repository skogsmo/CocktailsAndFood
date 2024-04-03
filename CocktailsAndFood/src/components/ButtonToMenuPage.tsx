import React from "react"
import { Link } from "react-router-dom"

const ButtonToMenuPage: React.FunctionComponent= () => {
    return (
        <>
            <Link to="/menu"> 
                <button className="py-6 px-10 bg-yellow-300 text-gray-600 rounded-full shadow hover:bg-yellow-200 hover:shadow-md">
                    <span>
                        Till menyn
                    </span>
                </button>
            </Link>
        </>
    );
};

export default ButtonToMenuPage;