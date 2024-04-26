import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Cocktail, DrinkDetailsResponse, DrinkInfo, Extra, mapDrinkDetailsWithCocktail } from "../orderTypes";

type DataContextType = {
    drinksInfo: DrinkInfo[];
    proteinOptions: Extra[];
    sideOptions: Extra[];
    getCocktail: (drinkId: string) => Promise<Cocktail>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData used outside of Provider");
    }
    return context;
};

export const DataContextProvider = ({ children }: { children: ReactNode }) => {

    const [drinksInfo, setDrinksInfo] = useState<DrinkInfo[]>([]);
    const [proteinOptions, SetProteinOptions] = useState<Extra[]>([]);
    const [sideOptions, SetSideOptions] = useState<Extra[]>([]);

    useEffect(() => {

        fetch("data/drink-info.json")
            .then((response) => response.json())
            .then((data: DrinkInfo[]) => setDrinksInfo(data));

        fetch("data/proteins.json")
            .then((response) => response.json())
            .then((data: Extra[]) => SetProteinOptions(data));

        fetch("data/sides.json")
            .then((response) => response.json())
            .then((data: Extra[]) => SetSideOptions(data));

        console.log("Fetched json data");
    }, []);

    const getCocktail = async (drinkId: string) => {
        const drinkInfo = drinksInfo.find(di => di.drinkId === drinkId);
        if (!drinkInfo) {
            console.warn("Unable to get drink info for drink " + drinkId + ", price will be default");
        }
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
        );
        const data: DrinkDetailsResponse = await response.json();
        return mapDrinkDetailsWithCocktail(data, drinkInfo?.price);
    };

    return (
        <DataContext.Provider
            value={{
                drinksInfo,
                proteinOptions,
                sideOptions,
                getCocktail,
            }}>
            {children}
        </DataContext.Provider>
    );
};
