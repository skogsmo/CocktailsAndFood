import { Link } from "react-router-dom";

export default function StandardLinkButton({
    children,
    to,
    yellow = false,
    width = "w-[290px]",
}: {
    children: React.ReactNode;
    to: string;
    yellow?: boolean;
    width?: string;
}) {
    const themeClasses = yellow
        ? "border-yellow-400 hover:border-yellow-300 bg-yellow-400 hover:bg-yellow-300"
        : "border-neutral-300 hover:bg-neutral-100";

    const commonClasses = "border-2 rounded-full p-3 text-sm font-semibold text-center";

    const classes = [themeClasses, commonClasses, width].join(" ");

    return (
        <Link to={to} className={classes}>
            {children}
        </Link>
    );
}
