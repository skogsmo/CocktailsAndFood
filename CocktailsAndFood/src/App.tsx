import "./App.css";
import {Route, Routes} from "react-router-dom"
import Start from "./pages/Start"
import Menu from "./pages/Menu"
import Testapi from "./pages/TutorialApiFetching"

function App() {
  return (
    <>
  <Routes>
    <Route path="/" element={<Start/>} />   
    <Route path="/menu" element={<Menu/>} />
    <Route path="/testapi" element={<Testapi/>} />
  </Routes>
  </>
  )
}

export default App;
