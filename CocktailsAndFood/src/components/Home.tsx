import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
            <div className="flex flex-col gap-8 items-center justify-center">
                <h1 className="text-4xl">Välkommen till Bowls & Cocktails</h1>
                <div className="w-full">
                    <Link to="/menu">
                        <button className="w-full py-2 px-4 rounded-full bg-amber-500 hover:bg-amber-400 text-xl font-semibold text-white hover:shadow-inner">
                            Menu
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}