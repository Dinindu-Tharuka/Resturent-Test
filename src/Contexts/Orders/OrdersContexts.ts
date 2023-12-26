import React from "react";
import { Order } from "../../Generics/interfaces";

interface OrderContextType {
    orders?:Order[];
}

const OrderContext = React.createContext<OrderContextType>(
  {} as OrderContextType
);

export default OrderContext;