import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Welcome } from "./pages/Welcome";
import { Menu } from "./pages/Menu";
import Detail from "./pages/Detail";
import { Meal, Order } from "./orderTypes";
import { DrinkSelection } from "./pages/DrinkSelection";
import { NotFound } from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";
import { DrinkList } from "./pages/DrinkList";
import BaseLayout from "./layout/BaseLayout";
import CancelOrderBarLayout from "./layout/CancelOrderBarLayout";
import CartButtonLayout from "./layout/CartButtonLayout";
import Layout from "./layout/Layout";
import { useState } from "react";

export type CartModifiers = {
    createOrder: (meal: Meal) => void;
    updateOrder: (updatedOrder: Order) => void;
    removeCurrentOrder: () => void;
    removeOrder: (orderId: number) => void;
};

function App() {
    const [layoutParadigm] = useState(1);
    return (
        <>
            {layoutParadigm === 1 && (
                <BaseLayout>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/detail" element={<Detail />} />
                        <Route path="/drinkselection" element={<DrinkSelection />} />
                        <Route path="/drinklist" element={<DrinkList />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BaseLayout>
            )}

            {layoutParadigm === 2 && (
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route element={<CancelOrderBarLayout />}>
                        <Route path="/checkout" element={<Checkout />} />
                        <Route element={<CartButtonLayout />}>
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/detail" element={<Detail />} />
                            <Route path="/drinkselection" element={<DrinkSelection />} />
                            <Route path="/drinklist" element={<DrinkList />} />
                        </Route>
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            )}

            {layoutParadigm === 3 && (
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route
                        path="/menu"
                        element={
                            <Layout cartButton>
                                <Menu />
                            </Layout>
                        }
                    />
                    <Route
                        path="/detail"
                        element={
                            <Layout cartButton cancelOrderBar>
                                <Detail />
                            </Layout>
                        }
                    />
                    <Route
                        path="/drinkselection"
                        element={
                            <Layout cartButton cancelOrderBar>
                                <DrinkSelection />
                            </Layout>
                        }
                    />
                    <Route
                        path="/drinklist"
                        element={
                            <Layout cartButton cancelOrderBar>
                                <DrinkList />
                            </Layout>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <Layout cancelOrderBar>
                                <Checkout />
                            </Layout>
                        }
                    />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            )}
        </>
    );
}

export default App;
