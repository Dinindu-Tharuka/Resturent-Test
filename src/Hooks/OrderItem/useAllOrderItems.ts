import { useQuery } from '@tanstack/react-query';
import { OrderItem } from '../../Generics/interfaces';
import allOrderItemsService from '../../services/Order/all-order-items-service';




const useAllOrderItems = () => {
  return useQuery<OrderItem[], Error>({
    queryKey: ["all_orderItems"],
    queryFn: () => allOrderItemsService.getAll(),
  });
}

export default useAllOrderItems