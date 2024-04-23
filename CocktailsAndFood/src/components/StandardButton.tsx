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
    noFixedWidth?: boolean;
}

export default function StandardButton({
    className,
    type = "button",
    children,
    to,
    yellow,
    small,
    noFixedWidth,
    ...restProps
}: ButtonProps) {

    const size = small ? "w-full min-w-[100px] p-[0.4rem]" : noFixedWidth ? "p-3" :"w-[290px] p-3";

    const themeClasses = yellow
        ? "border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300"
        : "border-neutral-300 hover:bg-neutral-100";

    const commonClasses =
        "text-neutral-900 flex justify-center border-2 rounded-full text-sm font-semibold text-nowrap";

    const classes = twMerge(themeClasses, commonClasses, size, className);

    if (to) {
        return (
            <Link to={to} className="w-fit block">
                <button type={type} className={classes} {...restProps}>
                    {children}
                </button>
            </Link>
        );
    } else {
        return (
            <button type={type} className={classes} {...restProps}>
                {children}
            </button>
        );
    }
}
