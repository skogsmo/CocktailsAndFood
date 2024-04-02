import React from "react"
import { Link } from "react-router-dom"

const ButtonToMenuPage: React.FunctionComponent= () => {
    return (
        <>
            <Link to="/menu"> 
                <button className="py-4 px-6 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md">
                    <span>
                        Till menyn
                    </span>
                </button>
            </Link>
        </>
    );
};

export default ButtonToMenuPage;