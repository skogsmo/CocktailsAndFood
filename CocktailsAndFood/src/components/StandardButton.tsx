import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    children: string;
    to?: string;
    yellow?: boolean;
    small?: boolean;
    restProps?: ButtonProps;
}

export default function StandardButton({
    className,
    type = "button",
    children,
    to,
    yellow = false,
    small = false,
    ...restProps
}: ButtonProps) {

    const size = small ? "w-full min-w-[100px] p-[0.4rem]" : "w-[290px] p-3";

    const themeClasses = yellow
        ? "border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300"
        : "border-neutral-300 hover:bg-neutral-100";

    const commonClasses =
        "text-neutral-900 flex justify-center border-2 rounded-full text-sm font-semibold p-3";

    const classes = twMerge(themeClasses, commonClasses, size, className);

    if (to) {
        return (
            <Link to={to}>
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
