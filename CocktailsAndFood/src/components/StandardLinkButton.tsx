import { Link } from "react-router-dom";

export default function StandardLinkButton({
    children,
    to,
    onClick,
    yellow = false,
    width = "w-[290px]",
}: {
    children: string;
    to?: string;
    onClick?: () => void;
    yellow?: boolean;
    width?: string;
}) {
    if (to === undefined && onClick === undefined) {
        console.warn("StandardLinkButton: Neither 'to' nor 'onClick' property is assigned. The button will be disabled.");
    }

    const themeClasses = yellow
        ? "border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300"
        : "border-neutral-300 hover:bg-neutral-100";

    const commonClasses =
        "text-neutral-900 flex justify-center border-2 rounded-full p-3 text-sm font-semibold text-center";

    const classes = [themeClasses, commonClasses, width].join(" ");

    return (
        <>
            {to && (
                <Link to={to} className={classes}>
                    {children}
                </Link>
            )}
            {onClick && (
                <button type="button" className={classes} onClick={onClick}>
                    {children}
                </button>
            )}
        </>
    );
}
