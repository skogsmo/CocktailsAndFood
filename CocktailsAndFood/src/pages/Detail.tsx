import { Extra, Order } from "../orderTypes";
import { RadiobuttonSelector } from "../components/RadiobuttonSelector";
import { CartModifiers } from "../App";
import { useState } from "react";
import StandardLinkButton from "../components/StandardLinkButton";

const Detail = ({
    updateOrder,
    currentOrder,
}: {
    updateOrder: CartModifiers["updateOrder"];
    currentOrder: Order;
    removeOrder: CartModifiers["removeCurrentOrder"];
}) => {
    const [sideOptions] = useState<Extra[]>([
        {
            Id: 1,
            Name: "Ris",
            Price: 15,
        },
        {
            Id: 2,
            Name: "Romansallad",
            Price: 25,
        },
        {
            Id: 3,
            Name: "Ris och romansallad",
            Price: 35,
        },
    ]);
    const [proteinOptions] = useState<Extra[]>([
        {
            Id: 1,
            Name: "Chipotlegrillad kyckling",
            Price: 5,
        },
        {
            Id: 2,
            Name: "Barbecue biff",
            Price: 15,
        },
        {
            Id: 3,
            Name: "Carnitas",
            Price: 10,
        },
        {
            Id: 4,
            Name: "Pulled jackfruit",
            Price: 20,
        },
        {
            Id: 5,
            Name: "Veggie strips",
            Price: 25,
        },
    ]);

    const radioButtonLabel = (option: Extra) => (
        <div className="flex gap-2 text-xs flex-wrap text-nowrap select-none">
            {option.Name}
            <span className="font-normal">
                {" "}
                (+{option.Price.toFixed(2)} kr)
            </span>
        </div>
    );

    return (
        <div className="main-wrapper">
            <div className="px-8 md:px-0 text-center flex flex-col gap-5 mb-[50px]">
                <h2>ANPASSA DIN BESTÄLLNING</h2>
                <p className="text-lg">
                    Skapa din perfekta kombination av smaker
                </p>
            </div>
            <div className="w-full md:rounded-[25px] overflow-hidden bg-white shadow-custom-big">
                <img
                    className="h-[350px] w-full object-cover"
                    src={currentOrder.Meal.imageUrl}
                    alt={currentOrder.Meal.title}
                />
                <div className="px-8 py-12">
                    <h3 className="mb-[10px]">
                        {currentOrder.Meal.title}
                    </h3>
                    <p className="font-semibold mb-[15px]">
                        {currentOrder.Meal.price.toFixed(2)} kr
                    </p>
                    <p>{currentOrder.Meal.description}</p>
                </div>
                <hr className="border-neutral-300 border-t" />
                <div className="p-8">
                    <h5 className="mb-5">Val av protein, välj 1 st</h5>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-8">
                        <RadiobuttonSelector
                            updateAction={updateOrder}
                            object={currentOrder}
                            property="Protein"
                            options={proteinOptions}
                            optionIdProperty="Id"
                            optionTitleProperty="Name"
                            renderLabel={radioButtonLabel}
                            wrapperClasses="flex justify-between p-4 rounded-xl border-2 border-neutral-300 items-center gap-2 hover:bg-neutral-100 cursor-pointer"
                        />
                    </div>
                </div>

                <hr className="border-neutral-300 border-t" />

                <div className="p-8">
                    <h5 className="mb-5">
                        Ris eller sallad för bowl, välj 1 st
                    </h5>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-8">
                        <RadiobuttonSelector
                            updateAction={updateOrder}
                            object={currentOrder}
                            property="Side"
                            options={sideOptions}
                            optionIdProperty="Id"
                            optionTitleProperty="Name"
                            renderLabel={radioButtonLabel}
                            wrapperClasses="flex justify-between p-4 rounded-xl border-2 border-neutral-300 items-center gap-2 hover:bg-neutral-100 cursor-pointer"
                        />
                    </div>
                </div>

                <hr className="border-neutral-300 border-t" />
                <div className="w-full flex flex-col-reverse gap-4 items-center md:flex-row justify-between p-8">
                    <StandardLinkButton to={"/menu"}>Avbryt</StandardLinkButton>
                    <StandardLinkButton to={"/drinkselection"} yellow>
                        Nästa steg
                    </StandardLinkButton>
                </div>
            </div>
        </div>
    );
};

export default Detail;
