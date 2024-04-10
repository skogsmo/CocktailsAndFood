import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";

export const Menu = ({
  createOrder,
}: {
  createOrder: (meal: Meal) => void;
}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    fetch("https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes")
      .then((res) => res.json())
      .then((json) => setMeals(json));
  }, []);

  return (
    <>
      <h1 className="text-center text-6xl font-ultra my-5">
        VÅRA BURRITO BOWLS
      </h1>
      <p className="text-center font-ultra">
        Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.
      </p>
      <p className="text-center font-ultra">
        Du anpassar din beställning i nästa steg.
      </p>
      <ul className="flex my-10">
        {meals.map((meal) => (
          <li key={meal._id}>
            <MenuCard meal={meal} createOrder={createOrder} />
          </li>
        ))}
      </ul>
    </>
  );
};
