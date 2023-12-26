import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "../../Generics/interfaces";
import { REQUEST } from "../../Generics/constants";
import orderService from "../../services/Order/order-service";

const useOrderMutate = (
  onSuccessfull: (order: Order) => void,
  requestType: string
) => {
  const queryClient = useQueryClient();

  const order = useMutation<Order, Error, Order>({
    mutationFn: (order: Order) => {
      if (requestType === REQUEST.POST) {
        return orderService.create(order).then((res) => res.data);
      } else if (requestType === REQUEST.DELETE) {
        return orderService.delete(order.id !== undefined ? order.id : 0).then((res) => res.data);
      }

      return orderService.update(order, order.id !== undefined ? order.id : 0).then((res) => res.data);
    },
    onSuccess: (savedOrder, newOrder) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      queryClient.invalidateQueries({
        queryKey:["pageOrders"]
      })

      onSuccessfull(savedOrder);
    },
  });

  return order;
};

export default useOrderMutate;
