import { useQuery } from '@tanstack/react-query';
import { OrderItem } from '../../Generics/interfaces';
import orderItemservice from '../../services/Order/order-item-service';

interface Query{
    order_id:number;
}

const useOrderItems = (query:Query) => {
  return useQuery<OrderItem[], Error>({
    queryKey: ["orderItems"],
    queryFn: () => orderItemservice(query.order_id).getAll(),
  });
}

export default useOrderItems