import { Outlet } from "react-router-dom";
import { ButtonToCart } from "../components/ButtonToCart";

export default function CartButtonLayout() {
    return (
        <div className="grid grid-cols-[minmax(0,_1fr)_minmax(auto,_1064px)_minmax(0,_1fr)]">
            <div></div>
            <div className="w-full">
                <Outlet />
            </div>
            <div className="sticky top-16 h-fit w-fit flex justify-start">
                <ButtonToCart />
            </div>
        </div>
    );
}
