import { useEffect, useState } from "react";
import DishCard from "../components/dishCard";
import { Link } from "react-router-dom";

const BASE_URL = "https://iths-2024-recept-grupp3-3j1u35.reky.se";

interface Food {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
}
export default function GetFood() {
    const [foods, setFoods] = useState<Food[]>([]);
    
    useEffect(() => {
        const fetchFood = async () => {
            const response = await fetch(`${BASE_URL}/recipes`);
            const foods = (await response.json()) as Food[];
            console.log(foods);
            setFoods(foods); 
        };
        fetchFood();
    }, []);
    return (


        <>
    <Link to="/"> 
        <button className="py-4 px-6 my-10 mx-10 bg-gray-50 text-gray-600 rounded-full shadow hover:bg-gray-100 hover:shadow-md gap-4">
          <span>
            Tillbaka
          </span>
        </button>
    </Link>
<div className="flex flex-col gap-4 h-screen justify-center items-center">


<div className="flex flex-col gap-4 h-screen items-center">
        <h1 className="text-gray-800 text-6xl font-bold">Meny</h1>

{foods.map((food) => (
        <DishCard key={food._id} food={food}/>  
    ))}
</div>
</div>
        </>
        )

}
