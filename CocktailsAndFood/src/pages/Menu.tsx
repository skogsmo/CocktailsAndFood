import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import StandardHeader from "../layout_components/StandardHeader";
import { useDataContext } from "../context/DataContext";
import { RecommendedOrder } from "../components/RecommendedOrder";

export const Menu = () => {
  const { getMenu } = useDataContext();
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    (async () => {
      const menu = await getMenu();
      setMeals(menu);
    })();
  }, []);

  return (
    <>
      <img src="" alt="" />
      <StandardHeader
        head={"Våra burrito bowls"}
        subHeads={[
          "Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.",
          "Du anpassar din beställning i nästa steg.",
        ]}
      />
      <div className="absolute left-[80px] top-24 origin-top-right -rotate-12">
        <RecommendedOrder />
      </div>

      <div className="w-full flex justify-center">
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
          {meals.map((meal) => (
            <li key={meal._id}>
              <MenuCard meal={meal} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
