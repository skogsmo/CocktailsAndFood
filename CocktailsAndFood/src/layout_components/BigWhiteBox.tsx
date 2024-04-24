import { ReactNode } from "react";

export default function BigWhiteBox({ children }: { children: ReactNode }) {
    return (
        <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
            {children}
        </div>
    );
}
