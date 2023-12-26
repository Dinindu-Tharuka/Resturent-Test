import { Order } from "../../Generics/interfaces";
import { HttpQueryService } from "../http-service";



export default new HttpQueryService<Order>("/store/orders/");