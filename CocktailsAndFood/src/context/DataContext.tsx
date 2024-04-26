import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { DrinkInfo, Extra } from "../orderTypes";

type DataContextType = {
    drinksInfo: DrinkInfo[];
    proteinOptions: Extra[];
    sideOptions: Extra[];
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData used outsode of Provider");
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

    return (
        <DataContext.Provider
            value={{
                drinksInfo,
                proteinOptions,
                sideOptions,
            }}>
            {children}
        </DataContext.Provider>
    );
};
