import { AboutUsInfo } from "../pages/AboutUs";

export const AboutUsCard = ({ name, title, description, imageUrl }: AboutUsInfo) => {
    return (
        <>
            <div className="bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105">
                <div className="h-[250px]">
                    <img
                        src={imageUrl}
                        className="h-full object-fit w-full"
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-4 p-6">
                    <h4 className="text-center font-bold">
                        {name}
                    </h4>
                    <div className="flex gap-3 items-center">
                        <p className="text-center font-semibold text-sm">
                            {title}
                        </p>
                    </div>
                    <p className="text-xs text-center">{description}</p>
                </div>
            </div>
        </>
    );
};