import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    children: ReactNode;
    to?: string;
    yellow?: boolean;
    small?: boolean;
    backArrow?: boolean;
    // noFixedWidth?: boolean;
}

export default function StandardButton({
    className,
    type = "button",
    children,
    to,
    yellow,
    small,
    backArrow,
    ...restProps
}: ButtonProps) {
    const size = small
        ? "w-full min-w-[100px] p-[0.4rem]"
        : "w-[290px] py-3 px-8";

    const themeClasses = yellow
        ? "border-yellow-400 hover:border-yellow-300 group-hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300 group-hover:bg-yellow-300"
        : "border-neutral-300 hover:bg-neutral-100";

    const commonClasses =
        "text-neutral-900 flex justify-center gap-4 items-center border-2 rounded-full text-sm font-semibold text-nowrap min-w-fit duration-100";

    const classes = twMerge(themeClasses, commonClasses, size, className);

    if (to) {
        return (
            <Link to={to} className="w-fit block">
                <button type={type} className={classes} {...restProps}>
                    {backArrow && (
                        <i className="fa-solid fa-arrow-left-long"></i>
                    )}
                    {children}
                </button>
            </Link>
        );
    } else {
        return (
            <button type={type} className={classes} {...restProps}>
                {backArrow && <i className="fa-solid fa-arrow-left-long"></i>}
                {children}
            </button>
        );
    }
}
