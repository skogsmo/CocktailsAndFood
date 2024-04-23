import { ButtonToCart } from "../components/ButtonToCart";
import { CancelOrderBar } from "../components/CancelOrderBar";
import {
    Dispatch,
    ReactNode,
    createContext,
    useContext,
    useState,
} from "react";

const LayoutContext = createContext<{
    setShowCartButton: Dispatch<React.SetStateAction<boolean>>;
    setShowCancelOrderBar: Dispatch<React.SetStateAction<boolean>>;
    setDisableLayout: Dispatch<React.SetStateAction<boolean>>;
}>({
    setShowCartButton: () => {},
    setShowCancelOrderBar: () => {},
    setDisableLayout: () => {},
});

export const useCartButton = (showCartButton: boolean) => {
    const { setShowCartButton, setDisableLayout } = useContext(LayoutContext);
    setDisableLayout(false);
    setShowCartButton(showCartButton);
};

export const useCancelOrderBar = (showCancelOrderBar: boolean) => {
    const { setShowCancelOrderBar, setDisableLayout } = useContext(LayoutContext);
    setDisableLayout(false);
    setShowCancelOrderBar(showCancelOrderBar);
};

export const useLayout = (useLayout: boolean) => {
    const { setDisableLayout } = useContext(LayoutContext);
    setDisableLayout(!useLayout);
};

export default function BaseLayout({ children }: { children: ReactNode }) {
    const [showCartButton, setShowCartButton] = useState(false);
    const [showCancelOrderBar, setShowCancelOrderBar] = useState(false);
    const [disableLayout, setDisableLayout] = useState(true);

    const output = disableLayout ? (
        children
    ) : (
        <div className="flex flex-col gap-[75px] min-h-screen">
            <div className="grid grid-cols-[minmax(0,_1fr)_minmax(auto,_1064px)_minmax(0,_1fr)] grow">
                <div></div>
                <div className="w-full">{children}</div>
                <div className="sticky top-16 h-fit w-fit flex justify-start">
                    {showCartButton && <ButtonToCart />}
                </div>
            </div>
            <div className="sticky bottom-0">
                {showCancelOrderBar && <CancelOrderBar />}
            </div>
        </div>
    );

    return (
        <LayoutContext.Provider
            value={{
                setShowCartButton,
                setShowCancelOrderBar,
                setDisableLayout,
            }}>
            {output}
        </LayoutContext.Provider>
    );
}
