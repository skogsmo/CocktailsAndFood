import { TeamMemberInfo } from "../pages/AboutUs";

export const AboutUsCard = ({
    name,
    title,
    description,
    imageUrl,
}: TeamMemberInfo) => {
    return (
        <>
            <div className="flex flex-col bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105">
                <div className="relative">
                    <img
                        src={imageUrl}
                        className="aspect-[1/1.25] object-cover w-full"
                    />
                    <div className="absolute bg-[#e79569] w-full h-full inset-0 opacity-20 mix-blend-lighten"></div>
                    <img src="img/scratches.jpg" className="absolute bg-[#e79569] w-full h-full object-cover inset-0 opacity-20 mix-blend-screen"/>
                </div>
                <div className="grow flex flex-col items-center gap-4 p-6">
                    <div className="flex flex-col">
                        <h4 className="text-center font-bold">{name}</h4>
                        <p className="text-center font-semibold text-sm text-neutral-500 capitalize">{title}</p>
                    </div>
                    <div className="h-full flex items-center">
                        <p className="text-sm text-center italic">
                            "{description}"
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
