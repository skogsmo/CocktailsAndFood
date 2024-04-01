import { useState } from "react";
import { Drink, getDrinkPrice } from "../types/Drink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const itemsPerPage = 10;

export default function DrinksList({ items, onDrinkClick }: { items: Drink[], onDrinkClick: (e: React.MouseEvent<HTMLButtonElement>) => void }) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const displayedDrinks = items.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col">
            {totalItems > itemsPerPage &&
                <>
                    <p className="text-gray-500">({startIndex + 1}-{endIndex} / {totalItems})</p>
                    <button onClick={() => goToPage(currentPage - 1)} className={`${currentPage === 1 ? "invisible" : "visible"} flex items-center`}>
                        <FontAwesomeIcon icon={faAngleUp} className="text-cyan-500 hover:text-cyan-400 rounded-full p-1 size-5" />
                    </button>
                </>
            }
            <ul className="flex flex-col">
                {displayedDrinks.map(drink => (
                    <li key={drink.id}>
                        <button value={drink.id} onClick={onDrinkClick} className="group flex gap-4 justify-between w-full text-lg font-bold text-cyan-500 hover:text-cyan-400">
                            <span>{drink.name}</span>
                            <span className="font-semibold text-gray-500 group-hover:text-gray-400">{getDrinkPrice(drink)} kr</span>
                        </button>
                    </li>
                ))}
            </ul>
            {totalItems > itemsPerPage &&
                <>
                    <button onClick={() => goToPage(currentPage + 1)} className={`${currentPage === totalPages ? "invisible" : "visible"} flex items-center`}>
                        <FontAwesomeIcon icon={faAngleDown} className="text-cyan-500 hover:text-cyan-400 rounded-full p-1 size-5" />
                    </button>
                </>
            }
        </div>
    );
};
