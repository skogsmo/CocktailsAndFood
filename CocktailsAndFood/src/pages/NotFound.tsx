import StandardButton from "../components/StandardButton";

export const NotFound = () => {
    return (
        <div className="w-full h-2/3 text-center flex flex-col justify-center items-center gap-16">
            <div className="flex flex-col gap-4">
                <h1 className="text-9xl">404</h1>
                <h2>Page not found</h2>
            </div>
            <StandardButton yellow to="/">
                Tillbaka till välkomstsidan
            </StandardButton>
        </div>
    );
};
