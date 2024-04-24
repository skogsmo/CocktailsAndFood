import { ReactNode } from "react";

export default function BigWhiteBoxSection({ children }: { children: ReactNode }) {
    return (
        <div className="w-full px-8 py-12">
            {children}
        </div>
    );
}
