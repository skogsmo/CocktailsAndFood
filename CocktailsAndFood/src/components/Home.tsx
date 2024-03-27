import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <h1>Home!</h1>
            <Link to="/menu">
                <button className="px-4 py-2 bg-white shadow rounded-full">
                    Menu!
                </button>
            </Link>
        </>
    )
}