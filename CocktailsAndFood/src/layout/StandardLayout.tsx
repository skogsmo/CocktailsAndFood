import { ButtonToCart } from "../components/ButtonToCart";
import { CancelOrderBar } from "../components/CancelOrderBar";
import { ReactNode, useEffect, useState } from "react";
import { RecommendedOrder } from "../components/RecommendedOrder";

export default function StandardLayout({
    children,
    cancelOrderBar,
    cartButton,
    chefsChoice,
}: {
    children: ReactNode;
    cancelOrderBar?: boolean;
    cartButton?: boolean;
    chefsChoice?: boolean;
}) {
    const [middleOfWindow, setMiddleOfWindow] = useState(window.innerWidth / 2);

    useEffect(() => {
        const handleResize = () => {
            setMiddleOfWindow(window.innerWidth / 2);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen items-center">
            <div className="grow flex flex-col py-[75px] items-center w-full max-w-[1064px] md:px-[32px]">
                {children}
            </div>
            {chefsChoice && (
                <div
                    className="fixed top-24 -translate-x-1/2 -rotate-12 hover:scale-105 duration-200 transition-transform"
                    style={{ left: `${middleOfWindow - 720}px` }}>
                    <RecommendedOrder />
                </div>
            )}
            {cartButton && (
                <div
                    className="fixed top-32 h-fit w-fit flex justify-start"
                    style={{ left: `${middleOfWindow + 530}px` }}>
                    <ButtonToCart />
                </div>
            )}
            <div className="sticky bottom-0 w-full">
                {cancelOrderBar && <CancelOrderBar />}
            </div>
        </div>
    );
}
