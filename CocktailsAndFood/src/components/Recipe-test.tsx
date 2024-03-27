import React, { useEffect, useState } from 'react';
import { Meal } from '../types/Meal';

// type Ingredient = {
//     name: string;
//     amount: number;
//     unit: string;
// };

// type Recipe = {
//     title: string;
//     description: string;
//     ratings?: number[];
//     imageUrl: string;
//     timeInMins: number;
//     categories: string[];
//     instructions: string[];
//     price: number;
//     ingredients: Ingredient[];
// };

export const RecipeList: React.FC = () => {

    const [meals, setMeals] = useState<Meal[]>([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes');
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         const data: Recipe[] = await response.json();
    //         setRecipes(data);
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        fetch('https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setMeals(data);
            });
    }, []);

    return (<></>);
    // return (
    //     <>
    //         <h1>Recipes</h1>
    //         <ul>
    //             {recipes.map(recipe => (
    //                 <li key={recipe.title}>
    //                     <h2>{recipe.title}</h2>
    //                     <img src={recipe.imageUrl} />
    //                     <p>Description: {recipe.description}</p>
    //                     <p>Time: {recipe.timeInMins} mins</p>
    //                     <p>Price: ${recipe.price}</p>
    //                     <p>Categories: {recipe.categories.join(', ')}</p>
    //                     <h3>Ingredients:</h3>
    //                     <ul>
    //                         {recipe.ingredients.map(ingredient => (
    //                             <li key={ingredient.name}>
    //                                 {ingredient.name}: {ingredient.amount} {ingredient.unit}
    //                             </li>
    //                         ))}
    //                     </ul>
    //                     <h3>Instructions:</h3>
    //                     <ol>
    //                         {recipe.instructions.map((instruction, index) => (
    //                             <li key={index}>{instruction}</li>
    //                         ))}
    //                     </ol>
    //                 </li>
    //             ))}
    //         </ul>
    //     </>
    // );
}
