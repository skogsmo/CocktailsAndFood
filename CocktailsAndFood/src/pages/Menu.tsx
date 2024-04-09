import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

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

<ProductCard/>

        {foods.map((food) => (
            <div className="bg-red-600" key={food._id}>
                {food.title} {food.price} kr
                <img className="w-20" src={food.imageUrl} />
                <span className="bg-blue-500 m-50">{food.description}</span>
            </div>
        ))}

    </div>
</div>

        </>
    )
}

