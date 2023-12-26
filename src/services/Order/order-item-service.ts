import { OrderItem } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";


const orderItemservice = (order_id:number)=>{
    return new HttpQueryService<OrderItem>(`/store/orders/${order_id}/order-items/`);

}


export default orderItemservice