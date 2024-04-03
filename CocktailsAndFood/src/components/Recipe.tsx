import { useEffect, useState } from "react";

type Recipe = {
    name: string;
}


export const RecipeComp1 = () => {
    const [Recipe, setRecipe] = useState<Recipe | undefined>(undefined);
    useEffect(()=> {
        fetch("https://iths-2024-recept-grupp3-3j1u35.reky.se/swagger")
        .then(response => response.json())
        .then(data => setRecipe(data))
        .catch(err => console.log(err))
    }, [])
    return(
        <p>{Recipe?.name}</p>
    )
    
}