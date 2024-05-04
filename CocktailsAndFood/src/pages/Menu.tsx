import { useEffect, useState } from "react";
import { Meal } from "../orderTypes";
import StandardHeader from "../layout_components/StandardHeader";
import { useDataContext } from "../context/DataContext";
import StandardButton from "../components/StandardButton";
import ItemCard from "../components/ItemCard";
import { useNavigate } from "react-router-dom";
import { ActionType, useOrderContext } from "../context/OrderContext";

export const Menu = () => {
    const { getMenu } = useDataContext();
    const [meals, setMeals] = useState<Meal[]>([]);

    const [spicinessDescending, setSpicinessDescending] = useState(true);
    const [priceDescending, setPriceDescending] = useState(false);
    const [titleDescending, setTitleDescending] = useState(false);
    const [sortBy, setSortBy] = useState("");
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();

    const { dispatch } = useOrderContext();

    const handleClickMeal = (meal: Meal) => {
        dispatch({ type: ActionType.CREATE_ORDER, payload: meal });
        navigate("/detail");
    };

    useEffect(() => {
        (async () => {
            const menu = await getMenu();
            setMeals(menu);
        })();
    }, []);

    const getSortFunction = () => {
        const sortSpicinessIncreasing = (a: Meal, b: Meal) =>
            a.spiciness - b.spiciness;
        const sortSpicinessDecreasing = (a: Meal, b: Meal) =>
            b.spiciness - a.spiciness;
        const sortPriceIncreasing = (a: Meal, b: Meal) => a.price - b.price;
        const sortPriceDecreasing = (a: Meal, b: Meal) => b.price - a.price;
        const sortTitleIncreasing = (a: Meal, b: Meal) =>
            a.title.localeCompare(b.title);
        const sortTitleDecreasing = (a: Meal, b: Meal) =>
            b.title.localeCompare(a.title);

        if (sortBy === "spiciness") {
            return spicinessDescending
                ? sortSpicinessDecreasing
                : sortSpicinessIncreasing;
        } else if (sortBy === "price") {
            return priceDescending ? sortPriceDecreasing : sortPriceIncreasing;
        } else if (sortBy === "title") {
            return titleDescending ? sortTitleDecreasing : sortTitleIncreasing;
        }
    };

    const sortFunction = getSortFunction();

    const handleOnClick = (sort: string) => {
        if (sortBy === sort) {
            if (sort === "spiciness") setSpicinessDescending((prev) => !prev);
            else if (sort === "price") setPriceDescending((prev) => !prev);
            else if (sort === "title") setTitleDescending((prev) => !prev);
        }
        setSortBy(sort);
    };

    return (
        <>
            <StandardHeader
                head={"Våra burrito bowls"}
                subHeads={[
                    "Välj en bowl med ris eller sallad, grönsaker, protein och dressing/salsa.",
                    "Du anpassar din beställning i nästa steg.",
                ]}
            />

            <div className="flex flex-col gap-8">
                <div className="gap-4 items-center px-8 py-4 flex w-full md:rounded-2xl overflow-hidden bg-white shadow-custom-big text-nowrap">
                    <h5>Sortera efter:</h5>
                    <StandardButton
                        onClick={() => handleOnClick("spiciness")}
                        yellow={sortBy === "spiciness" ? true : false}
                        className="w-fit h-fit px-4 gap-2 shrink-0"
                        small>
                        Kryddighet{" "}
                        <i
                            className={
                                "fa-solid translate-y-[1px] " +
                                (spicinessDescending === true
                                    ? "fa-angle-up"
                                    : "fa-angle-down")
                            }></i>
                    </StandardButton>
                    <StandardButton
                        onClick={() => handleOnClick("price")}
                        yellow={sortBy === "price" ? true : false}
                        className="w-fit h-fit px-4 gap-2 shrink-0"
                        small>
                        Pris{" "}
                        <i
                            className={
                                "fa-solid translate-y-[1px] " +
                                (priceDescending === true
                                    ? "fa-angle-up"
                                    : "fa-angle-down")
                            }></i>
                    </StandardButton>
                    <StandardButton
                        onClick={() => handleOnClick("title")}
                        yellow={sortBy === "title" ? true : false}
                        className="w-fit h-fit px-4 gap-2 shrink-0"
                        small>
                        Namn{" "}
                        <i
                            className={
                                "fa-solid translate-y-[1px] " +
                                (titleDescending === true
                                    ? "fa-angle-up"
                                    : "fa-angle-down")
                            }></i>
                    </StandardButton>

                    <div
                        className={
                            "text-neutral-900 flex justify-center gap-4 items-center border-2 rounded-full text-sm font-semibold text-nowrap w-full min-w-[100px] p-[0.4rem] border-neutral-300 px-3 relative " +
                            (filter === ""
                                ? "border-neutral-300"
                                : "border-yellow-400")
                        }>
                        <input
                            className="w-full outline-none"
                            type="Text"
                            placeholder="Filtrera"
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                        />

                        {filter && (
                            <button
                                onClick={() => setFilter("")}
                                className="size-7 absolute right-[2px] rounded-full hover:bg-yellow-300">
                                <i className="fa-solid fa-xmark text-neutral-900"></i>
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <ul className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-8">
                        {meals
                            .filter(
                                (meal) =>
                                    meal.title
                                        .toLowerCase()
                                        .includes(filter.toLowerCase()) ||
                                    meal.description
                                        .toLowerCase()
                                        .includes(filter.toLowerCase())
                            )
                            .sort(sortFunction)
                            .map((meal) => (
                                <li key={meal._id}>
                                    <ItemCard
                                        item={meal}
                                        onClicked={handleClickMeal}
                                        spiciness={meal.spiciness}
                                        imageLeft={true}
                                    />
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
