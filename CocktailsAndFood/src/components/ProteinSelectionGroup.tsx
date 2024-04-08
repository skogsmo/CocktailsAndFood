import React from "react";
import { Extra, Order } from "../orderTypes";

export const ProteinSelectionGroup = ({
  currentOrder,
  updateOrder,
}: {
  currentOrder: Order;
  updateOrder: (updatedOrder: Order) => void;
}) => {
  const proteinList: Extra[] = [
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

  if (!currentOrder.Protein) {
    currentOrder.Protein = proteinList[0];
    updateOrder(currentOrder);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentOrder.Protein = proteinList.find(
      (protein) => protein.Id === Number(e.target.value)
    );
    updateOrder(currentOrder);
  };

  const mappedProteins = proteinList.map((protein) => {
    return (
      <React.Fragment key={protein.Id}>
        <input
          id={`protein-${protein.Id}`}
          type="radio"
          name="protein"
          value={protein.Id}
          checked={currentOrder.Protein?.Id === protein.Id}
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor={`protein-${protein.Id}`}>
          {protein.Name}{" "}
          <span className="font-bold">+{protein.Price.toFixed(2)}kr</span>
        </label>
        <br />
      </React.Fragment>
    );
  });

  return (
    <>
      <form>
        <ul>{mappedProteins}</ul>
      </form>
    </>
  );
};
