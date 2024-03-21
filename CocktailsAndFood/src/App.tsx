import "./App.css";
import { RecipeComp1 } from "./components/Recipe";

function App() {
  return (
    <>
      <p>test</p>
      <div className="flex flex-col gap-4 h-screen justify-center items-center">
        <h2 className="text-2xl text-center">
          Välkommen till <span className="text-xs font-thin">(Linnea)</span>
        </h2>
        <h1 className="text-5xl font-bold text-center">
          Bowls & Cocktails <span className="text-xs font-thin">(Claes)</span>
        </h1>
        <button className="py-4 px-6 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md">
          <span>En knapp som kan leda någonstans i framtiden</span>
          <span className="text-xs font-thin ml-2">(Benjamin)</span>
        </button>
        <h2 className="text-2xl text-center">
          Smaklig måltid! <span className="text-xs font-thin">(Lotta)</span>
        </h2>
        <div className="flex flex-col items-center">
          <img src="images/profile.png" />
          <p className="text-indigo-800 hover:text-indigo-500 font-bold select-none">
            Niclas
          </p>
        </div>
        <button className="shadow-none py-4 px-6 bg-emerald-200 text-black rounded-full hover hover:bg-emerald-300">
          <span>Emerald Button - Dan</span>
        </button>
      </div>
      <RecipeComp1></RecipeComp1>
      <h3 className="text-x1 text-center">
        Alexander, testa att connecta mot API
      </h3>
    </>
  );
}

export default App;
