import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import {
    Cocktail,
    DrinkDetailsResponse,
    DrinkInfo,
    Extra,
    Meal,
    mapDrinkDetailsWithCocktail,
} from "../orderTypes";
import { GET_MENU_FROM_JSON } from "../constants";

type DataContextType = {
    drinksInfo: DrinkInfo[];
    proteinOptions: Extra[];
    sideOptions: Extra[];
    getCocktail: (drinkId: string) => Promise<Cocktail>;
    getMenu: () => Promise<Meal[]>;
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
        const drinkInfo = drinksInfo.find((di) => di.drinkId === drinkId);
        if (!drinkInfo) {
            console.warn(
                "Unable to get drink info for drink " +
                    drinkId +
                    ", price will be default"
            );
        }
        const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
        );
        const data: DrinkDetailsResponse = await response.json();
        return mapDrinkDetailsWithCocktail(data, drinkInfo?.price);
    };

    const getMenu = async () => {
        let res: Response;

        if (GET_MENU_FROM_JSON) {
            res = await fetch("data/menu.json");
        } else {
            res = await fetch(
                "https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes"
            );
        }

        const json: {
            _id: string;
            title: string;
            imageUrl: string;
            description: string;
            price: number;
            categories: string[];
            timeInMins: number;
        }[] = await res.json();

        const meals: Meal[] = json.map((item) => ({
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrl,
            description: item.description,
            price: item.price,
            ingredients: item.categories.map((Name) => ({
                Name,
                IsIncluded: true,
            })),
            spiciness: item.timeInMins,
        }));

        return meals;
    };

    return (
        <DataContext.Provider
            value={{
                drinksInfo,
                proteinOptions,
                sideOptions,
                getCocktail,
                getMenu,
            }}>
            {children}
        </DataContext.Provider>
    );
};
