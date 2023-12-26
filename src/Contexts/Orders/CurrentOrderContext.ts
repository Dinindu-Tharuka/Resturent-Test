import React, { Dispatch } from "react";
import { Order } from "../../Generics/interfaces";

interface CurrentOrderContextType {
    currentOrder?:Order;
    setCurrentOrder:Dispatch<React.SetStateAction<Order|undefined>>
}

const CurrentOrderContext = React.createContext<CurrentOrderContextType>(
  {} as CurrentOrderContextType
);

export default CurrentOrderContext;