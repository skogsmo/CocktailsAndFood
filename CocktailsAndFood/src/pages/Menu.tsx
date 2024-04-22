import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import { CancelOrderBar } from "../components/CancelOrderBar";

export const Menu = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes"
      );
      const json: {
        _id: string;
        title: string;
        imageUrl: string;
        description: string;
        price: number;
        categories: string[];
      }[] = await res.json();
      const mealArray: Meal[] = json.map((item) => ({
        _id: item._id,
        title: item.title,
        imageUrl: item.imageUrl,
        description: item.description,
        price: item.price,
        ingredients: item.categories.map((Name) => ({
          Name,
          IsIncluded: true,
        })),
      }));
      setMeals(mealArray);
    };

    fetchMeals();
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <h2 className="text-center mb-[20px]">VÅRA BURRITO BOWLS</h2>
        <p className="text-center font-ultra">
          Välj en bowl med ris eller sallad, grönsaker, protein och
          dessing/salsa.
        </p>
        <p className="text-center font-ultra mb-[50px]">
          Du anpassar din beställning i nästa steg.
        </p>
        <div className="flex justify-center">
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
            {meals.map((meal) => (
              <li key={meal._id}>
                <MenuCard meal={meal} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CancelOrderBar />
    </>
  );
};
