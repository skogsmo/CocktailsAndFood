import { ButtonToCart } from "../components/ButtonToCart";
import { CancelOrderBar } from "../components/CancelOrderBar";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";

type LayoutState = {
    cancelOrderBar: boolean;
    cartButton: boolean;
    disableLayout: boolean;
};

const layoutReducer = (state: LayoutState, action: string): LayoutState => {
    switch (action) {
        case "enableCartButton":
            return {
                ...state,
                cartButton: true,
                disableLayout: false,
            };
        case "disableCartButton":
            return {
                ...state,
                cartButton: false,
                disableLayout: false,
            };
        case "enableCancelOrderBar":
            return {
                ...state,
                cancelOrderBar: true,
                disableLayout: false,
            };
        case "disableCancelOrderBar":
            return {
                ...state,
                cancelOrderBar: false,
                disableLayout: false,
            };
        case "enableLayout":
            return {
                ...state,
                disableLayout: false,
            };
        case "disableLayout":
            return {
                ...state,
                disableLayout: true,
            };
        default:
            console.warn("called layoutReducer with unknown action: " + action);
            return state;
    }
};

export const useCartButton = (useCartButton: boolean) => {
    const { dispatch } = useContext(LayoutContext);
    useEffect(() => {
        dispatch(useCartButton ? "enableCartButton" : "disableCartButton");
    }, []);
};

export const useCancelOrderBar = (useCancelOrderBar: boolean) => {
    const { dispatch } = useContext(LayoutContext);
    useEffect(() => {
        dispatch(
            useCancelOrderBar ? "enableCancelOrderBar" : "disableCancelOrderBar"
        );
    }, []);
};

export const useLayout = (useLayout: boolean) => {
    const { dispatch } = useContext(LayoutContext);
    useEffect(() => {
        dispatch(useLayout ? "enableLayout" : "disableLayout");
    }, []);
};

const LayoutContext = createContext<{ dispatch: React.Dispatch<string> }>({
    dispatch: () => {
        console.warn(
            "Called dispatch in BaseLayout without a LayoutContext.Provider"
        );
    },
});

export default function BaseLayout({ children }: { children: ReactNode }) {
    const [{ cartButton, cancelOrderBar, disableLayout }, dispatch] =
        useReducer(layoutReducer, {
            cancelOrderBar: false,
            cartButton: false,
            disableLayout: true,
        });

    const output = disableLayout ? (
        children
    ) : (
        <div className="flex flex-col gap-[75px] min-h-screen">
            <div className="grid grid-cols-[minmax(0,_1fr)_minmax(auto,_1064px)_minmax(0,_1fr)] grow">
                <div></div>
                <div className="w-full">{children}</div>
                <div className="sticky top-16 h-fit w-fit flex justify-start">
                    {cartButton && <ButtonToCart />}
                </div>
            </div>
            <div className="sticky bottom-0">
                {cancelOrderBar && <CancelOrderBar />}
            </div>
        </div>
    );

    return (
        <LayoutContext.Provider value={{ dispatch }}>
            {output}
        </LayoutContext.Provider>
    );
}
