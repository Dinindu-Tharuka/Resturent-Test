import { useQuery } from "@tanstack/react-query";
import { Order } from "../../Generics/interfaces";
import orderService from "../../services/Order/order-service";

interface Query{
  startDate?:string;
  endDate?:string;
}

const useOrders = (query?:Query) => {
  return useQuery<Order[], Error>({
    queryKey: ["orders", query],
    queryFn: () => orderService.getAll({
      params:{startDate:query?.startDate, endDate:query?.endDate}
    }),
    refetchInterval:500
  });
}

export default useOrders