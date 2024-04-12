import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import { CartModifiers } from "../App";

export const Menu = ({
  createOrder,
}: {
  createOrder: CartModifiers["createOrder"];
}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    fetch("https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes")
      .then((res) => res.json())
      .then((json) => setMeals(json));
  }, []);

  return (
    <>
      <h1 className="text-center text-6xl font-ultra my-10">
        VÅRA BURRITO BOWLS
      </h1>
      <p className="text-center font-ultra">
        Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.
      </p>
      <p className="text-center font-ultra mb-14">
        Du anpassar din beställning i nästa steg.
      </p>
      <div className="flex justify-center">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 w-4/5">
          {meals.map((meal) => (
            <li key={meal._id}>
              <MenuCard meal={meal} createOrder={createOrder} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
