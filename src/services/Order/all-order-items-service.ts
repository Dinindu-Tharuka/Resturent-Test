import { OrderItem } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";



export default new HttpQueryService<OrderItem>("/store/all-order-items/");