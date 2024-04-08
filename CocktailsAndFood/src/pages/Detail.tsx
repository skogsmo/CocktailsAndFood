import { Link } from "react-router-dom";
import { Extra, Order } from "../orderTypes";
import { RadiobuttonSelector } from "../components/RadiobuttonSelector";

type Placeholder = {
  img_src: string;
  name: string;
  price: number;
  description: string;
};

const Detail = ({
  updateOrder,
  currentOrder,
  removeOrder,
}: {
  updateOrder: (order: Order) => void;
  currentOrder: Order;
  removeOrder: () => void;
}) => {
  const placeholder: Placeholder = {
    img_src: currentOrder.Meal.imageUrl,
    name: currentOrder.Meal.title,
    price: currentOrder.Meal.price,
    description: currentOrder.Meal.description,
  };

  const radioButtonLabelStructure = (option: Extra) => (
    <>
      {option.Name}
      <span className="font-bold"> +{option.Price.toFixed(2)} kr</span>
    </>
  );

  return (
    <>
      <img src={placeholder.img_src} height={200} width={200} />
      <h1>{placeholder.name}</h1>
      <p>{placeholder.description}</p>
      <span>{placeholder.price.toFixed(2)}</span>

      <RadiobuttonSelector
        updateAction={updateOrder}
        object={currentOrder}
        propertyName="Side"
        idProperty="Id"
        titleProperty="Name"
        options={[
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
        ]}
        renderLabel={radioButtonLabelStructure}
      />
      <RadiobuttonSelector
        updateAction={updateOrder}
        object={currentOrder}
        propertyName="Protein"
        idProperty="Id"
        titleProperty="Name"
        options={[
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
        ]}
        renderLabel={radioButtonLabelStructure}
      />

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
