import React from "react";
import { Extra, Order } from "../orderTypes";

export const SideSelectionGroup = ({
  currentOrder,
  updateOrder,
}: {
  currentOrder: Order;
  updateOrder: (updatedOrder: Order) => void;
}) => {
  const sideList: Extra[] = [
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

  if (!currentOrder.Side) {
    currentOrder.Side = sideList[0];
    updateOrder(currentOrder);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentOrder.Side = sideList.find(
      (side) => side.Id === Number(e.target.value)
    );
    updateOrder(currentOrder);
  };

  const mappedsides = sideList.map((side) => {
    return (
      <React.Fragment key={side.Id}>
        <input
          id={`side-${side.Id}`}
          type="radio"
          name="side"
          value={side.Id}
          checked={currentOrder.Side?.Id === side.Id}
          onChange={(e) => handleOnChange(e)}
        />
        <label htmlFor={`side-${side.Id}`}>
          {side.Name}{" "}
          <span className="font-bold">+{side.Price.toFixed(2)}kr</span>
        </label>
        <br />
      </React.Fragment>
    );
  });

  return (
    <>
      <form>
        <ul>{mappedsides}</ul>
      </form>
    </>
  );
};
