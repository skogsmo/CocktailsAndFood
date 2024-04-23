import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import Detail from "./pages/Detail";
import { DrinkSelection } from "./pages/DrinkSelection";
import { NotFound } from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";
import { DrinkList } from "./pages/DrinkList";
import StandardLayout from "./layout/StandardLayout";

export type CartModifiers = {};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
                path="/menu"
                element={
                    <StandardLayout cartButton cancelOrderBar>
                        <Menu />
                    </StandardLayout>
                }
            />
            <Route
                path="/detail"
                element={
                    <StandardLayout cartButton cancelOrderBar>
                        <Detail />
                    </StandardLayout>
                }
            />
            <Route
                path="/drinkselection"
                element={
                    <StandardLayout cartButton cancelOrderBar>
                        <DrinkSelection />
                    </StandardLayout>
                }
            />
            <Route
                path="/drinklist"
                element={
                    <StandardLayout cartButton cancelOrderBar>
                        <DrinkList />
                    </StandardLayout>
                }
            />
            <Route
                path="/checkout"
                element={
                    <StandardLayout cancelOrderBar>
                        <Checkout />
                    </StandardLayout>
                }
            />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
