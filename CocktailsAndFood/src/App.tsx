import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Menu } from "./components/Menu";
import { CustomizeOrder } from "./components/CustomizeOrder";
import Summary from "./components/Summary";
import { ChooseDrink } from "./components/ChooseDrink";
import DrinkRecommendation from "./components/DrinkRecommendation";

function App() {
    

    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/customize-order" element={<CustomizeOrder />} />
                <Route path="/summary" element={<Summary />} />
                <Route path="/drink-recommendation" element={<DrinkRecommendation />} />
                <Route path="/choose-drink" element={<ChooseDrink />} />
            </Routes>
        </main>
    )
}

export default App;
