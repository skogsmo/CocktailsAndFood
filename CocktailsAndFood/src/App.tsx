import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { CustomizeOrder } from "./components/CustomizeOrder";
import { Summary } from "./components/Summary";
import { DrinkRecommendation } from "./components/DrinkRecommendation";

function App() {
    

    return (
        <main className="w-full min-h-screen flex flex-col bg-gray-200 p-4">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/customize-order" element={<CustomizeOrder />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/drink-recommendation" element={<DrinkRecommendation />} />
            </Routes>
        </main>
    )
}

export default App;
