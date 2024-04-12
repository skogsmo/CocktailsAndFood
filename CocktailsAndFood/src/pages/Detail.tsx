import { Link } from "react-router-dom";
import { Extra, Order } from "../orderTypes";
import { RadiobuttonSelector } from "../components/RadiobuttonSelector";
import { CartModifiers } from "../App";
import { useState } from "react";

const Detail = ({
  updateOrder,
  currentOrder,
  removeOrder,
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
      <span className="font-normal"> (+{option.Price.toFixed(2)} kr)</span>
    </div>
  );

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col items-center">
      <div className="px-8 md:px-0 text-center flex flex-col gap-2">
        <h2 className="mt-[75px] w-fit">ANPASSA DIN BESTÄLLNING</h2>
        <p className="text-lg mb-[50px]">
          Skapa din perfekta kombination av smaker
        </p>
      </div>
      <div className="rounded-[25px] overflow-hidden bg-white shadow-lg mb-[75px]">
        <img
          className="h-[350px] w-full object-cover"
          src={currentOrder.Meal.imageUrl}
        />
        <div className="px-8">
          <h3 className="mt-[50px] mb-[10px]">{currentOrder.Meal.title}</h3>
          <span>{currentOrder.Meal.price.toFixed(2)} kr</span>
          <p className="mt-[15px] mb-[50px]">{currentOrder.Meal.description}</p>
        </div>
        <hr className="border-neutral-300 border-t" />
        <div className="p-8">
          <h5 className="mb-5">Val av protein, välj 1 st</h5>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
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
          <h5 className="mb-5">Ris eller sallad för bowl, välj 1 st</h5>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
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
        <div className="w-full flex justify-between p-8">
          <Link to="/menu">
            <button
              onClick={removeOrder}
              className="border-2 border-neutral-300 hover:bg-neutral-100 rounded-3xl w-[290px] self-center p-3 text-sm font-semibold"
            >
              Avbryt
            </button>
          </Link>

          <Link to="/drinkselection">
            <button className="bg-yellow-400 hover:bg-yellow-300 rounded-3xl w-[290px] self-center p-3 text-sm font-semibold">
              Gå vidare
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detail;
