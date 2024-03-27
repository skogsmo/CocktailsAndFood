import { useContext } from "react";
import { CartContext, CartContextType } from "../contexts/CartContext";

export function Summary() {

    const { meals } = useContext(CartContext) as CartContextType;

    return (
        <>
            <div>
                <h2>Sammanfattning</h2>
                {meals.map((meal) => (
                    <div key={meal.id}>
                        <h3>{meal.food.title}</h3>
                        <p>Beskrivning: {meal.food.description}</p>
                        <p>Pris: {meal.food.price} kr</p>
                        {meal.protein && <p>Protein: {meal.protein.name} - {meal.protein.price} kr</p>}
                        {meal.carb && <p>Carb: {meal.carb.name} - {meal.carb.price} kr</p>}
                        {meal.drink && <p>Drink: {meal.drink.name}</p>}
                        <p><span>Totalt pris: </span>
                            {
                                meal.food.price +
                                (meal.protein ? meal.protein.price : 0) +
                                (meal.carb ? meal.carb.price : 0)
                            }
                            <span> kr</span>
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}