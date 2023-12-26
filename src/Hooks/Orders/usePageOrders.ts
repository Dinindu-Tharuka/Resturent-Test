import { useQuery } from "@tanstack/react-query";
import { Order, PaginationStructure } from "../../Generics/interfaces";
import pageOrderService from "../../services/Order/page-order-service";

interface Query {
  page: number;
  startDate?: string;
  endDate?: string;
}
const usePageOrders = (query: Query) => {
  return useQuery<PaginationStructure<Order>, Error>({
    queryKey: ["pageOrders", query],
    queryFn: () =>
      pageOrderService.getAll({
        params: { page: query.page, startDate: query.startDate, endDate:query.endDate },
      }),
  });
};

export default usePageOrders;
