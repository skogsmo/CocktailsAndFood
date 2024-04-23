import { ButtonToCart } from "../components/ButtonToCart";
import { CancelOrderBar } from "../components/CancelOrderBar";
import { ReactNode } from "react";

export default function Layout({
    children,
    cancelOrderBar,
    cartButton,
}: {
    children: ReactNode;
    cancelOrderBar?: boolean;
    cartButton?: boolean;
}) {
    return (
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
}
