import { MenuCard } from "../components/MenuCard";
import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import StandardHeader from "../layout_components/StandardHeader";
import { useDataContext } from "../context/DataContext";
import StandardButton from "../components/StandardButton";

export const Menu = () => {
    const { getMenu } = useDataContext();
    const [meals, setMeals] = useState<Meal[]>([]);

    const [spicinessDesc, setSpicinessDesc] = useState(true);
    const [priceDesc, setPriceDesc] = useState(true);
    const [sortBy, setSortBy] = useState("price")

    useEffect(() => {
        (async () => {
            const menu = await getMenu();
            setMeals(menu);
        })();
    }, []);
    
    const getSortFunction = () => {
        const sortSpicinessIncreasing = (a: Meal, b: Meal) => a.spiciness - b.spiciness;
        const sortSpicinessDecreasing = (a: Meal, b: Meal) => b.spiciness - a.spiciness;
        const sortPriceIncreasing = (a: Meal, b: Meal) => a.price - b.price;
        const sortPriceDecreasing = (a: Meal, b: Meal) => b.price - a.price;

        if (sortBy === "spiciness") {
            return spicinessDesc ? sortSpicinessDecreasing : sortSpicinessIncreasing;
        } else if (sortBy === "price") {
            return priceDesc ? sortPriceDecreasing : sortPriceIncreasing;
        }
    }

    const sortFunction = getSortFunction();
    
    return (
        <>
            <StandardHeader
                head={"Våra burrito bowls"}
                subHeads={[
                    "Välj en bowl med ris eller sallad, grönsaker, protein och dessing/salsa.",
                    "Du anpassar din beställning i nästa steg.",
                ]}
            />

            <div className="flex flex-col gap-8">
                <div className="gap-8 items-center px-8 py-4 flex w-full md:rounded-2xl overflow-hidden bg-white shadow-custom-big">
                    <h5>Sortera efter:</h5>
                    <StandardButton onClick={getSortFunction} yellow className="w-fit h-fit px-4 gap-2" small>Kryddighet <i className="fa-solid fa-angle-up"></i></StandardButton>
                    <StandardButton className="w-fit h-fit" small>Pris <i className="fa-solid fa-angle-up text-neutral-400"></i></StandardButton>
                </div>
    
                <div className="w-full flex justify-center">
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
                        {meals.sort(sortFunction).map((meal) => (
                            <li key={meal._id}>
                                <MenuCard meal={meal} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
