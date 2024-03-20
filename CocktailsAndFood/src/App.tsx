import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 h-screen justify-center items-center">
        <h2 className="text-2xl text-center">
          Välkommen till <span className="text-xs font-thin">(Linnea)</span>
        </h2>
        <h1 className="text-5xl font-bold text-center">
          Bowls & Cocktails <span className="text-xs font-thin">(Claes)</span>
        </h1>
        <button className="py-4 px-6 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md">
          <span>
            En knapp som kan leda någonstans i framtiden
          </span>
          <span className="text-xs font-thin ml-2">
            (Benjamin)
          </span>
        </button>
        <h3 className="text-xl text-center">
          Smaklig måltid! <span className="text-xs font-thin">(Lotta)</span>
        </h3>
        </div>
    </>
  );
}

export default App;
