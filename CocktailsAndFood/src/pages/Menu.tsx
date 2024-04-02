import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

        <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Empty card
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Some quick example text to build on the card title and make up the bulk
                of the card's content.
            </p>
            <button
            type="button"
            className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            data-twe-ripple-init
            data-twe-ripple-color="light">
                Button
            </button>
        </div>



        {foods.map((food) => (
            <div className="bg-red-600" key={food._id}>
                {food.title} {food.price} kr {food.description} 
                <img className="w-20" src={food.imageUrl} />
                <span className="bg-blue-500 m-50">Extra text inbetween iterations</span>
            </div>
        ))}


        {/* {foods.map((food) => (
            <div className="bg-red-600" key={food._id}>
                {food.title} {food.price} kr {food.description} 
                <img className="w-20" src={food.imageUrl} />
                <span className="bg-blue-500 m-50">Extra text inbetween iterations</span>
            </div>
        ))} */}


    </div>
</div>

        </>
    )
}

