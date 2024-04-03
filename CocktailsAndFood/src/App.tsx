import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Menu from "./pages/Menu";


function App() {
  return (
    <>
  <Routes>
    <Route path="/" element={<Start />} />
    <Route path="/menu" element={<Menu />} />
  </Routes>
    </>
  );
}

export default App;
