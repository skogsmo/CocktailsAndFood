import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { OrderContextProvider } from "./context/OrderContext.tsx";
import { DataContextProvider } from "./context/DataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <DataContextProvider>
                <OrderContextProvider>
                    <App />
                </OrderContextProvider>
            </DataContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
