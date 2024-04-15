import React, { ReactNode, createContext, useContext, useState } from "react";
import { Order } from "../orderTypes";

type OrderContextType = {
  orders: Order[] | undefined;
  setOrders: React.Dispatch<React.SetStateAction<Order[] | undefined>>;
};

export const OrderContext = createContext<OrderContextType | undefined>(
  undefined
);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext was null");
  }
  return context;
};

export const OrderContextProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[] | undefined>(undefined);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
