import StandardButton from "./StandardButton";
import { SpicyChilis } from "./SpicyChilis";
import { Item } from "../orderTypes";
import { twMerge } from "tailwind-merge";
export default function ItemCard<T extends Item>({
    item,
    item: { title, price, description, imageUrl },
    onClicked,
    spiciness,
    imageLeft,
}: {
    item: T;
    onClicked: (item: T) => void;
    spiciness?: number;
    imageLeft?: boolean;
}) {
    return (
        <>
            <div
                onClick={() => onClicked(item)}
                className="flex bg-white md:rounded-2xl shadow-custom-big overflow-hidden h-full cursor-pointer group">
                <div className="w-1/3 h-full overflow-hidden">
                    <img
                        src={imageUrl}
                        className={twMerge(imageLeft ? "object-left" : "object-center", "h-full object-cover w-full group-hover:scale-110 duration-150")}
                    />
                </div>
                <div className="flex flex-col justify-between gap-4 w-2/3 p-8 pt-7">
                    <div className="flex flex-col gap-1">
                        <div>
                            <h4 className="font-bold leading-tight -my-1">
                                {title}
                            </h4>
                            <div className="flex gap-3 items-center">
                                <p className="font-semibold my-2 text-sm">
                                    {price.toFixed(2)} kr
                                </p>
                                {spiciness && (
                                    <SpicyChilis spiciness={spiciness} />
                                )}
                            </div>
                        </div>
                        <p className="text-xs">{description}</p>
                    </div>
                    <StandardButton yellow small>
                        Välj
                    </StandardButton>
                </div>
            </div>
        </>
    );
}
