import { Link } from "react-router-dom";
import { Extra, Order } from "../orderTypes";
import { RadiobuttonSelector } from "../components/RadiobuttonSelector";
import { CartModifiers } from "../App";

const Detail = ({
  updateOrder,
  currentOrder,
  removeOrder,
}: {
  updateOrder: CartModifiers["updateOrder"];
  currentOrder: Order;
  removeOrder: CartModifiers["removeCurrentOrder"];
}) => {
  const sideOptions: Extra[] = [
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
  ];

  const proteinOptions: Extra[] = [
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
  ];

  const radioButtonLabel = (option: Extra) => (
    <div className="flex gap-2 font-semibold">
      {option.Name}
      <span className="font-normal"> (+{option.Price.toFixed(2)} kr)</span>
    </div>
  );

  return (
    <>
      <img src={currentOrder.Meal.imageUrl} height={200} width={200} />
      <h1>{currentOrder.Meal.title}</h1>
      <p>{currentOrder.Meal.description}</p>
      <span>{currentOrder.Meal.price.toFixed(2)}</span>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <RadiobuttonSelector
            updateAction={updateOrder}
            object={currentOrder}
            property="Protein"
            options={proteinOptions}
            optionIdProperty="Id"
            optionTitleProperty="Name"
            renderLabel={radioButtonLabel}
          />
        </div>
        <div className="flex flex-col">
          <RadiobuttonSelector
            updateAction={updateOrder}
            object={currentOrder}
            property="Side"
            options={sideOptions}
            optionIdProperty="Id"
            optionTitleProperty="Name"
            renderLabel={radioButtonLabel}
          />
        </div>
      </div>

      <Link to="/menu">
        <button onClick={removeOrder}>Avbryt</button>
      </Link>

      <Link to="/drinkselection">
        <button>Gå vidare</button>
      </Link>
    </>
  );
};

export default Detail;
