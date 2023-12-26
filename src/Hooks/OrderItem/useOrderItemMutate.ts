import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderItem } from "../../Generics/interfaces";
import { REQUEST } from "../../Generics/constants";
import orderItemservice from "../../services/Order/order-item-service";


const useOrderItemMutate = (
    onSuccessfull: (orderItem: OrderItem) => void,
    requestType: string,
    order_id:number
) => {
    const queryClient = useQueryClient();

    const orderItem = useMutation<OrderItem, Error, OrderItem>({
      mutationFn: (orderItem: OrderItem) => {
        if (requestType === REQUEST.POST) {
          return orderItemservice(order_id).create(orderItem).then((res) => res.data);
        } else if (requestType === REQUEST.DELETE) {
          return orderItemservice(order_id).delete(orderItem.id !== undefined ? orderItem.id : 0).then((res) => res.data);
        }
  
        return orderItemservice(order_id).update(orderItem, orderItem.id !== undefined ? orderItem.id : 0).then((res) => res.data);
      },
      onSuccess: (savedOrder, newOrder) => {
        queryClient.invalidateQueries({
          queryKey: ["orderItems"],
        });

        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });

        
  
        onSuccessfull(savedOrder);
      },
    });
  
    return orderItem; 
}

export default useOrderItemMutate