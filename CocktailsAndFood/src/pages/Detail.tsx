import { Link } from "react-router-dom";
import { ProteinSelectionGroup } from "../components/ProteinSelectionGroup";
import { SideSelectionGroup } from "../components/SideSelectionGroup";
import { Order } from "../orderTypes";

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

  // const showLog = () => {
  //   console.log("protein: " + currentOrder.Protein?.Name);
  //   console.log("side: " + currentOrder.Side?.Name);
  // };

  return (
    <>
      <img src={placeholder.img_src} height={200} width={200} />
      <h1>{placeholder.name}</h1>
      <p>{placeholder.description}</p>
      <span>{placeholder.price.toFixed(2)}</span>

      <ProteinSelectionGroup
        currentOrder={currentOrder}
        updateOrder={updateOrder}
      />
      <SideSelectionGroup
        currentOrder={currentOrder}
        updateOrder={updateOrder}
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
