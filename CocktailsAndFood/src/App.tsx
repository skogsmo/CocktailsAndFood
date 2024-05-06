import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import Detail from "./pages/Detail";
import { DrinkSelection } from "./pages/DrinkSelection";
import { NotFound } from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";
import { DrinkList } from "./pages/DrinkList";
import StandardLayout from "./layout/StandardLayout";
import { useEffect } from "react";
import { AboutUs } from "./pages/AboutUs";

export type CartModifiers = {};

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
                path="/menu"
                element={
                    <StandardLayout cartButton chefsChoice cancelOrderBar>
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
            <Route path="/*" element={
                    <StandardLayout>
                        <NotFound />
                    </StandardLayout>
                } />

            <Route path="/about" element={
                    <StandardLayout>
                        <AboutUs />
                    </StandardLayout>
                } />
            </Routes>
    );
}

export default App;
