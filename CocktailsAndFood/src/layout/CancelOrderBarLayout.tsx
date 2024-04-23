import { Outlet } from "react-router-dom";
import { CancelOrderBar } from "../components/CancelOrderBar";

export default function CancelOrderBarLayout() {
    return (
        <div className="flex flex-col gap-[75px] min-h-screen">
            <div className="grow">
                <Outlet />
            </div>
            <div className="sticky bottom-0">
                <CancelOrderBar />
            </div>
        </div>
    );
}
